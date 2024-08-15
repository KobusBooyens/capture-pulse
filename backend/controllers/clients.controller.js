const db = require("../models");
const { z } = require("zod");
const validateAndRespond = require("../utils/zodValidation");
const { startSession } = require("mongoose");

const clientDetail = {
    firstName: z.string({ required_error: "firstName is required" }),
    lastName: z.string({ required_error: "lastName is required" }),
    dob: z.string({ required_error: "dob is required" }),
    gender: z.enum(["Male", "Female"], { required_error: "gender is required" }),
    email: z.string({ required_error: "email is required" }),
    contactNumber: z.string({ required_error: "contactNumber is required" }),
    weight: z.number({ required_error: "weight is required" }),
    length: z.number({ required_error: "length is required" }),
    goal: z.string({ required_error: "goal is required" }),
};
const partnerDetail = z.object(clientDetail);

const schema = z.object({
    ...clientDetail,
    joiningDate: z.string({ required_error: "joiningDate is required" }),
    package: z.string({ required_error: "package is required" }),
    amount: z.string({ required_error: "amount is required" }),
    partner: partnerDetail.optional(),
}).refine(data => {
    if (data.package === "Couple") {
        return partnerDetail.safeParse(data.partner).success;
    }
    return true;
}, {
    message: "Partner details are required for Couple package",
    path: ["partner"],
});

const getAll = async (req, res) => {
    try {
        const data = await db.Client.find({})
            .populate({
                path: "clientPackage",
                populate: "package"
            })
            .lean();

        const response = await formatClientResponse(data);

        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const get = async (req, res) => {
    try {
        const data = await db.Client.findById(req.params.id)
            .populate({
                path: "clientPackage",
                populate: "package"
            })
            .lean();

        if (!data) {
            return res.status(404).send("Client not found");
        }
        
        const response = await formatClientResponse([data]);

        res.json(response[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const create = async (req, res) => {
    const session = await startSession();
    session.startTransaction();
    try {
        const { payload, error } = validateAndRespond(schema, req.body);

        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }

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

        return res.status(201).json(result);
    } catch (err) {
        await session.abortTransaction();
        console.error(err);
        return res.status(500).send({ message: "Internal Server Error", error: err });
    } finally {
        await session.endSession();
    }
};

const edit = async (req, res) => {
    const session = await startSession();
    session.startTransaction();

    try {
        const { payload, error } = validateAndRespond(schema, req.body);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }

        const client = await db.Client.findById(req.params.id).session(session);
        if (!client) {
            return res.status(404).send("Client not found");
        }

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

        res.json(client);
    } catch (err) {
        await session.abortTransaction();
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    } finally {
        await session.endSession();
    }
};

const deleteItem = async (req, res) => {
    try {
        const data = await db.Client.delete({ _id: req.params.id });
        if (!data) {
            return res.status(404).send("Client not found");
        }
        res.send("Client deleted");
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const formatClientResponse = async (data) => {
    const clientPackageList = await getClientPackageList();
    console.log("clientPackageList", clientPackageList);
    console.log(data);
    return data.map(d => {
        const resp = {
            ...d,
            package: d?.clientPackage?.package._id,
            packageName: d?.clientPackage?.package.name,
            amount: d?.clientPackage?.amount,
            packagePartners:
                clientPackageList[d?.clientPackage?._id] ?? undefined
        };

        delete resp.clientPackage;
        return resp;
    });
};

const getClientPackageList = async () => {
    const data = await db.Packages.aggregate([
        { $match: { name: "Couples" } },
        {
            $lookup: {
                from: "clientPackage",
                localField: "_id",
                foreignField: "package",
                as: "clientPackage"
            }
        },
        { $unwind: "$clientPackage" },
        {
            $lookup: {
                from: "clients",
                localField: "clientPackage._id",
                foreignField: "clientPackage",
                as: "clients"
            }
        },
        { $unwind: "$clients" },
        {
            $group: {
                _id: "$clientPackage._id",
                clients: {
                    $push: {
                        id: "$clients._id",
                        firstName: "$clients.firstName",
                        lastName: "$clients.lastName"
                    }
                }
            }
        },
        {
            $project: {
                clientPackageId: "$_id",
                _id: 0,
                clients: 1
            }
        }
    ]);

    return data ? data?.reduce((acc, record) => {
        acc[record.clientPackageId] = record.clients.map(client => ({
            id: client.id,
            name: `${client.firstName} ${client.lastName}`,
        }));
        return acc;
    }, {}) : undefined;
};

module.exports = { getAll, get, create, edit, deleteItem };
