const db = require("../models");
const { clientPackageLookup, packageLookup, membershipLookup } = require("./pipelineHelpers/_lookupExtensions");
const { formatClientResponse } = require("../controllers/utils");
const { startSession } = require("mongoose");
const { ObjectId } = require("mongodb");

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
    const session = await startSession();
    session.startTransaction();
    console.log("id", id);
    try {
        let membership;
        if (ObjectId.isValid(id)) {
            console.log("update");
            membership = await db.Memberships.findOneAndUpdate(
                { _id: id },
                { $set: { ...payload } },
                { upsert: true, new: true, session })
                .lean();
        } else {
            console.log("createMembership");
            membership = await this.createMembership(payload);
        }

        if (payload.client) {
            await db.Client.findOneAndUpdate(
                { _id: payload.client },
                { $set: { membership: membership } },
                { session });
        }
        
        await session.commitTransaction();
        return membership;
    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        await session.endSession();
    }
};

exports.createMembership = async (payload) => {
    const membership = new db.Memberships({ ...payload });
    return await membership.save();
};

exports.deleteMembership = async (id) => {
    return db.Memberships.delete({ _id: id });
};