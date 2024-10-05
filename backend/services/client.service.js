const db = require("../models");
const { formatClientResponse } = require("../controllers/utils");
const { clientNotesLookup, clientPackageLookup, packageLookup } = require("./pipelineHelpers/_lookupExtensions");
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
        //look up memberships
        { $lookup: {
            from: "memberships",
            localField: "_id",
            foreignField: "client",
            as: "memberships"
        } },
        { $unwind: { path: "$memberships", preserveNullAndEmptyArrays: true } },
        //look up membership packages
        { $lookup: {
            from: "membershipPackage",
            localField: "memberships.membershipPackage",
            foreignField: "_id",
            as: "membershipPackage"
        } },
        { $unwind: { path: "$membershipPackage", preserveNullAndEmptyArrays: true } },
        //look up membership goals
        { $lookup: {
            from: "goals",
            localField: "memberships.goal",
            foreignField: "_id",
            as: "goals"
        } },
        { $unwind: { path: "$goals", preserveNullAndEmptyArrays: true } },
        //look up packages
        { $lookup: {
            from: "packages",
            localField: "membershipPackage.package",
            foreignField: "_id",
            as: "packages"
        } },
        { $unwind: { path: "$packages", preserveNullAndEmptyArrays: true } },

        { $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            gender: 1,
            email: 1,
            dob: 1,
            contactNumber: 1,
            agent: 1,
            membership: {
                _id: "$memberships._id",
                goal: {
                    _id: "$goals._id",
                    name: "$goals.name",
                },
                weight: "$memberships.weight",
                height: "$memberships.height",
                status: "$memberships.status",
                package: {
                    _id: "$packages._id",
                    name: "$packages.name",
                },
                membershipPackage: {
                    _id: "$membershipPackage._id",
                    joiningDate: "$membershipPackage.joiningDate",
                    paymentDay: "$membershipPackage.paymentDay",
                    amount: "$membershipPackage.amount",
                    clients: "$membershipPackage.clients",
                }
            },

        } },

        { ...clientNotesLookup },
    ];

    const [data, recordCount] = await Promise.all([
        db.Client.aggregate(aggregationPipeline),
        db.Client.countDocuments(queryFilter)
    ]);

    return {
        records: data ?? [],
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

exports.getClientDropdownList = async (subscriptionId) => {
    const clients = await db.Client.find({ subscription: subscriptionId }).select("firstName lastName").sort({ firstName: 1, lastName: 1 });
    return clients.map(record => ({ _id: record._id, fullName: `${record.firstName} ${record.lastName}` }));
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