const db = require("../models");
const { formatClientResponse } = require("../controllers/utils");
const { startSession } = require("mongoose");
const validateAndRespond = require("../utils/zodValidation");

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

    let sortFilter = { firstName: 1, lastName: 1 };
    if (payload.sortColumn && payload.sortDirection) {
        const sortDirection = payload.sortDirection === "asc" ? 1 : -1;

        if (payload.sortColumn === "client") {
            sortFilter = { firstName: sortDirection, lastName: sortDirection };
        } else if (payload.sortColumn === "package") {
            sortFilter = { "clientPackage.package.name": sortDirection };
        } else if (payload.sortColumn === "joined") {
            sortFilter = { joined: sortDirection };
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

exports.get = async (id) => {
    const data = await db.Client.findById(id)
        .populate({
            path: "clientPackage",
            populate: "package"
        })
        .lean();

    return await formatClientResponse([data]);
};

exports.create = async(payload) => {
    const session = await startSession();
    session.startTransaction();
    try {

        const clientPackage = new db.ClientPackage({
            package: payload.package,
            amount: payload.amount
        });

        await clientPackage.save({ session });

        const saveClients = (item) => {
            const bulkOps = [];
            const clientData = { ...item, clientPackage };
            delete clientData.partner;
            bulkOps.push({ insertOne: { document: clientData } });

            if (item.partner) {
                bulkOps.push({ insertOne: {
                    document: {
                        ...item.partner,
                        clientPackage,
                        joiningDate: item.joiningDate } }
                });
            }
            return bulkOps;
        };

        const insertOperations = Array.isArray(payload) ?
            payload.flatMap(saveClients) :
            saveClients(payload);

        const result = await db.Client.bulkWrite(insertOperations, { session });
        await session.commitTransaction();
        return result;
    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        await session.endSession();
    }
};

exports.edit = async(id, payload) => {
    const session = await startSession();
    session.startTransaction();

    try {
        const client = await db.Client.findById(id).session(session);

        client.set(payload);

        if (client.clientPackage) {
            await db.ClientPackage.findByIdAndUpdate(client.clientPackage, {
                package: payload.package,
                amount: payload.amount
            }, { session });
        } else {
            const clientPackage = new db.ClientPackage({
                package: payload.package,
                amount: payload.amount
            });
            await clientPackage.save({ session });
            client.clientPackage = clientPackage._id;
        }

        await client.save({ session });
        await session.commitTransaction();
        return client;
    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        await session.endSession();
    }
};

exports.deleteItem = async(id) => {
    await db.Client.delete({ _id: id });
};