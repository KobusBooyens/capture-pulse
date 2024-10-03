const db = require("../models");
const { clientPackageLookup, packageLookup, membershipLookup } = require("./pipelineHelpers/_lookupExtensions");
const { formatClientResponse } = require("../controllers/utils");

exports.getPaginatedMembership = async (subscriptionId, payload) => {
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
        { ...membershipLookup },
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

exports.getMembershipByClient = async (clientId) => {
    return db.Memberships
        .find({ client: clientId })
        .lean();
};

exports.updateMembership = async (id, payload) => {
    return db.Memberships.findOneAndUpdate({ _id: id },
        { $set: { ...payload } });
};

exports.createMembership = async (payload) => {
    const membership = new db.Memberships({ ...payload });
    return await membership.save();
};

exports.deleteMembership = async (id) => {
    return db.Memberships.delete({ _id: id });
};