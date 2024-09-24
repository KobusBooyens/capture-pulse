const db = require("../models");
const { formatClientResponse, formatClientBillingResponse } = require("../controllers/utils");
const { clientPackageLookup, packageLookup } = require("./pipelineHelpers/_lookupExtensions");

exports.getAllBilling = async (subscriptionId, payload) => {
    const pageSize = payload.pageSize ? Number(payload.pageSize) : 10;
    const page = payload.page ? Number(payload.page) : 1;

    let queryFilter = { subscription: subscriptionId };

    if (payload.searchText) {
        queryFilter["$or"] = [
            { firstName: { $regex: ".*" + payload.searchText + ".*", $options: "i", }, },
            { lastName: { $regex: ".*" + payload.searchText + ".*", $options: "i", }, }
        ];
    }

    let sortFilter = { latestPaidDate: 1, lastName: 1, firstName: 1 };
    if (payload.sortColumn && payload.sortDirection) {
        const sortDirection = payload.sortDirection === "asc" ? 1 : -1;

        if (payload.sortColumn === "client") {
            sortFilter = { lastName: sortDirection, firstName: sortDirection };

        } else if (payload.sortColumn === "latestPaidDate") {
            sortFilter = { latestPaidDate: sortDirection };
        }
    }

    const aggregationPipeline = [
        { $match: queryFilter },
        { $sort: sortFilter },
        { $skip: pageSize * (page - 1) },
        { $limit: pageSize },
        { ...clientPackageLookup },
        { ...packageLookup },
    ];

    const [data, recordCount] = await Promise.all([
        db.Client.aggregate(aggregationPipeline),
        db.Client.countDocuments(queryFilter)
    ]);

    return {
        records: data ? await formatClientResponse(data) : [],
        recordCount: recordCount
    };
};

exports.getBilling = async (clientId, payload) => {
    const pageSize = payload.pageSize ? Number(payload.pageSize) : 10;
    const page = payload.page ? Number(payload.page) : 1;

    let queryFilter = { client: clientId };

    if (payload.searchText) {
        queryFilter["$or"] = [
            { date: { $regex: ".*" + payload.searchText + ".*", $options: "i", }, },
            { amount: { $regex: ".*" + payload.searchText + ".*", $options: "i", }, },
            { reference: { $regex: ".*" + payload.searchText + ".*", $options: "i", }, }
        ];
    }

    let sortFilter = { date: -1 };
    if (payload.sortColumn && payload.sortDirection) {
        const sortDirection = payload.sortDirection === "asc" ? 1 : -1;

        if (payload.sortColumn === "date") {
            sortFilter = { date: sortDirection };
        } else if (payload.sortColumn === "amount") {
            sortFilter = { amount: sortDirection };
        } else if (payload.sortColumn === "reference") {
            sortFilter = { reference: sortDirection };
        }
    }

    const [data, recordCount] = await Promise.all([
        db.Billing.find(queryFilter)
            .populate("client")
            .sort(sortFilter)
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .lean(),
        db.Billing.countDocuments(queryFilter)
    ]);

    return {
        ...formatClientBillingResponse(data),
        recordCount: recordCount
    };
};

exports.createBilling = async (payload) => {
    const handleBillingRecord = async (item) => {
        const newBilling = new db.Billing(item);
        const savedBilling = await newBilling.save();

        await db.Client.findOneAndUpdate(
            { _id: savedBilling.client },
            { $max: { latestPaidDate: savedBilling.date } }
        );

        return savedBilling;
    };

    if (Array.isArray(payload)) {
        return await Promise.all(payload.map(handleBillingRecord));
    }

    return await handleBillingRecord(payload);
};

exports.updateBilling = async (id, payload) => {
    const updateLatestPaidDate = async (originalBilling) => {
        if (payload.date && new Date(payload.date).getTime() !== originalBilling.date.getTime()) {
            const latestBilling = await db.Billing
                .find({ client: originalBilling.client })
                .sort({ date: -1 })
                .limit(1);

            const latestPaidDate = latestBilling.length > 0 ? latestBilling[0].date : null;
            await db.Client.findOneAndUpdate(
                { _id: originalBilling.client },
                { $set: { latestPaidDate } }
            );

        }
    };

    const originalBilling = await db.Billing.findById(id);

    const updatedBilling = await db.Billing.updateOne({ _id: id },
        { ...payload });

    await updateLatestPaidDate(originalBilling);

    return updatedBilling;
};