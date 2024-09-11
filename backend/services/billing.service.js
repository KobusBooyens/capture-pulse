const db = require("../models");
const { formatClientResponse, formatClientBillingResponse } = require("../controllers/billing/utils");

exports.getAll = async (payload) => {
    const pageSize = payload.pageSize ? Number(payload.pageSize) : 10;
    const page = payload.page ? Number(payload.page) : 1;

    let queryFilter = {};

    if (payload.searchText) {
        queryFilter["$or"] = [
            { firstName: { $regex: ".*" + payload.searchText + ".*", $options: "i", }, },
            { lastName: { $regex: ".*" + payload.searchText + ".*", $options: "i", }, }
        ];
    }

    let sortFilter = {};
    if (payload.sortColumn && payload.sortDirection) {
        const sortDirection = payload.sortDirection === "asc" ? 1 : -1;

        if (payload.sortColumn === "client") {
            sortFilter = { lastName: sortDirection, firstName: sortDirection };

        } else if (payload.sortColumn === "date") {
            sortFilter = { date: sortDirection };
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
        records: data ? await formatClientResponse(data) : [],
        recordCount: recordCount
    };
};

exports.get = async (clientId, payload) => {
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

    let sortFilter = {};
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