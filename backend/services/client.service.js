const db = require("../models");
const { formatClientResponse } = require("../controllers/utils");
const { startSession } = require("mongoose");
const { clientNotesLookup, clientPackageLookup, packageLookup, membershipLookup } = require("./pipelineHelpers/_lookupExtensions");
const { ObjectId } = require("mongodb");

exports.getAllClients = async (subscriptionId, payload) => {
    const pageSize = payload.pageSize ? Number(payload.pageSize) : 10;
    const page = payload.page ? Number(payload.page) : 1;

    let queryFilter = { subscription: subscriptionId };

    if (payload.searchText) {
        queryFilter["$or"] = [
            { firstName: { $regex: ".*" + payload.searchText + ".*", $options: "i", }, },
            { lastName: { $regex: ".*" + payload.searchText + ".*", $options: "i", }, }
        ];
    }

    let sortFilter = { firstName: 1, lastName: 1 };
    if (payload.sortColumn && payload.sortDirection) {
        const sortDirection = payload.sortDirection === "asc" ? 1 : -1;

        if (payload.sortColumn === "client") {
            sortFilter = { firstName: sortDirection, lastName: sortDirection };
        } else if (payload.sortColumn === "joined") {
            sortFilter = { joined: sortDirection };
        }
    }

    const aggregationPipeline = [
        { $match: queryFilter },
        { $sort: sortFilter },
        { $skip: pageSize * (page - 1) },
        { $limit: pageSize },
        { ...membershipLookup },
        { ...clientNotesLookup },
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

exports.getClient = async (id) => {
    const aggregationPipeline = [
        { $match: { _id: new ObjectId(id) } },
        { ...clientPackageLookup },
        { ...packageLookup },
    ];

    const data = await db.Client.aggregate(aggregationPipeline);
    return await formatClientResponse(data);
};

exports.createClient = async(subscriptionId, payload) => {
    const client = new db.Client({
        ...payload,
        subscription: subscriptionId
    });

    return await client.save();

    // const session = await startSession();
    // session.startTransaction();
    // try {
    //     const clientPackage = new db.ClientPackage({
    //         package: payload.package,
    //         amount: payload.amount
    //     });
    //
    //     await clientPackage.save({ session });
    //
    //     const saveClients = (item) => {
    //         const bulkOps = [];
    //         const clientData = {
    //             ...item,
    //             subscription: subscriptionId,
    //             clientPackage
    //         };
    //         delete clientData.partner;
    //         bulkOps.push({ insertOne: { document: clientData } });
    //
    //         if (item.partner) {
    //             bulkOps.push({ insertOne: {
    //                 document: {
    //                     ...item.partner,
    //                     clientPackage,
    //                     joiningDate: item.joiningDate,
    //                     subscription: subscriptionId
    //                 }
    //             } });
    //         }
    //         return bulkOps;
    //     };
    //
    //     const insertOperations = Array.isArray(payload) ?
    //         payload.flatMap(saveClients) :
    //         saveClients(payload);
    //
    //     const result = await db.Client.bulkWrite(insertOperations, { session });
    //     await session.commitTransaction();
    //     return result;
    // } catch (err) {
    //     await session.abortTransaction();
    //     throw err;
    // } finally {
    //     await session.endSession();
    // }
};

exports.getClientNotesByClientId = async(clientId) => {
    return db.ClientNotes.find({ _id: clientId })
        .select("note createdAt")
        .lean();
};

exports.createClientNote = async (payload) => {
    const clientNote = new db.ClientNotes({ ...payload });
    return clientNote.save();
};

exports.updateClient = async(id, payload) => {

    return db.Client.findOneAndUpdate({ _id: id }, { $set: { ...payload } });

    // const session = await startSession();
    // session.startTransaction();
    //
    // try {
    //     const client = await db.Client.findById(id).session(session);
    //
    //     client.set(payload);
    //
    //     if (client.clientPackage) {
    //         await db.ClientPackage.findByIdAndUpdate(client.clientPackage, {
    //             package: payload.package,
    //             amount: payload.amount
    //         }, { session });
    //     } else {
    //         const clientPackage = new db.ClientPackage({
    //             package: payload.package,
    //             amount: payload.amount
    //         });
    //         await clientPackage.save({ session });
    //         client.clientPackage = clientPackage._id;
    //     }
    //
    //     await client.save({ session });
    //     await session.commitTransaction();
    //     return client;
    // } catch (err) {
    //     await session.abortTransaction();
    //     throw err;
    // } finally {
    //     await session.endSession();
    // }
};

exports.deleteClient = async (id) => {
    return await db.Client.delete({ _id: id });
};

exports.deleteClientNote = async (id) => {
    return await db.ClientNotes.delete({ _id: id });
};