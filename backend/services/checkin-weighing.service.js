const validateAndRespond = require("../utils/zodValidation");
const db = require("../models");
const { formatResponse } = require("../controllers/checkins/_shared");
const { formatClientResponse } = require("../controllers/utils");

exports.getAll = async (payload) => {
    const pageSize = payload.pageSize ? Number(payload.pageSize) : 10;
    const page = payload.page ? Number(payload.page) : 1;

    let queryFilter = { };

    if (payload.searchText) {
        queryFilter["$or"] = [
            { date: { $regex: ".*" + payload.searchText + ".*", $options: "i", }, },
            { mood: { $regex: ".*" + payload.searchText + ".*", $options: "i", }, }
        ];
    }

    let sortFilter = { lastCheckinDate: 1, lastName: 1, firstName: 1 };
    if (payload.sortColumn && payload.sortDirection) {
        const sortDirection = payload.sortDirection === "asc" ? 1 : -1;

        if (payload.sortColumn === "date") {
            sortFilter = { lastCheckinDate: sortDirection };
        } else if (payload.sortColumn === "mood") {
            sortFilter = { "mood": sortDirection };
        }
    }

    const [ data, recordCount ] = await Promise.all([
        db.Client.find(queryFilter)
            .populate({
                path: "clientPackage",
                populate: "package"
            })
            .sort(sortFilter)
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .lean(),
        db.Client.countDocuments(queryFilter)
    ]);

    return {
        records: data && data?.length ? await formatClientResponse(data) : [],
        recordCount: recordCount
    };
};

exports.getByClient = async (clientId, payload) => {
    const pageSize = payload.pageSize ? Number(payload.pageSize) : 10;
    const page = payload.page ? Number(payload.page) : 1;

    let queryFilter = { client: clientId };

    if (payload.searchText) {
        queryFilter["$or"] = [
            { date: { $regex: ".*" + payload.searchText + ".*", $options: "i", }, },
            { mood: { $regex: ".*" + payload.searchText + ".*", $options: "i", }, }
        ];
    }

    let sortFilter = { date: -1 };
    if (payload.sortColumn && payload.sortDirection) {
        const sortDirection = payload.sortDirection === "asc" ? 1 : -1;

        if (payload.sortColumn === "date") {
            sortFilter = { date: sortDirection };
        } else if (payload.sortColumn === "mood") {
            sortFilter = { "mood": sortDirection };
        }
    }

    const [ data, recordCount ] = await Promise.all([
        db.GeneralCheckins.find(queryFilter)
            .populate("client")
            .sort(sortFilter)
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .lean(),
        db.GeneralCheckins.countDocuments(queryFilter)
    ]);

    return {
        records: data && data?.length ? formatResponse(data) : [],
        recordCount: recordCount
    };
};

exports.create = async (payload) => {
    const handleCheckinRecord = async (item) => {
        const newCheckin = new db.GeneralCheckins(item);
        const savedCheckin = await newCheckin.save();

        await db.Client.findOneAndUpdate(
            { _id: savedCheckin.client },
            { $max: { latestCheckinDate: savedCheckin.date } }
        );

        return savedCheckin;
    };

    if (Array.isArray(payload)) {
        return await Promise.all(payload.map(handleCheckinRecord));
    }

    return await handleCheckinRecord(payload);
};

exports.edit = async (id, payload) => {
    const updateLatestCheckinDate = async (originalCheckin) => {
        if (payload.date && new Date(payload.date).getTime() !== originalCheckin.date.getTime()) {
            const latestCheckin = await db.GeneralCheckins
                .find({ client: originalCheckin.client })
                .sort({ date: -1 })
                .limit(1);

            const latestCheckinDate = latestCheckin.length > 0 ? latestCheckin[0].date : null;
            await db.Client.findOneAndUpdate(
                { _id: originalBilling.client },
                { $set: { latestCheckinDate } }
            );

        }
    };

    const originalBilling = await db.GeneralCheckins.findById(id);

    const updatedBilling = await db.GeneralCheckins.updateOne({ _id: id },
        { ...payload });

    await updateLatestCheckinDate(originalBilling);

    return updatedBilling;
};