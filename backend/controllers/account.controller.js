const { z } = require("zod");
const db = require("../models");
const validateAndRespond = require("../utils/zodValidation");

const schema = z.object({
    client: z.string({ required_error: "client is required" }),
    amount: z.string({ required_error: "amount is required" }),
    date: z.string({ required_error: "date is required" }),
    reference: z.string({ required_error: "reference is required" })
});

const basicSchema = z.object({
    page: z.string({ required_error: "page is required" }),
    pageSize: z.string({ required_error: "pageSize is required" }),
    searchText: z.string().optional(),
    sortColumn: z.string().optional(),
    sortDirection: z.string().optional(),
});

const getAll = async (req, res) => {
    try {
        const { payload, error } = validateAndRespond(basicSchema, req.query);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }
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

        // const aggregatedResult = await db.Client.aggregate([
        //     {
        //         $lookup: {
        //             from: "packages",
        //             localField: "package",
        //             foreignField: "_id",
        //             as: "package"
        //         }
        //     },
        //     {
        //         $unwind: "$package"
        //     },
        //     {
        //         $lookup: {
        //             from: "accounts",
        //             localField: "_id",
        //             foreignField: "client",
        //             as: "account"
        //         }
        //     },
        //     {
        //         $unwind: {
        //             path: "$account",
        //             preserveNullAndEmptyArrays: true
        //         }
        //     },
        //     {
        //         $group: {
        //             _id: "$_id",
        //             client: { $first: "$$ROOT" },
        //             latestAccount: { $max: "$account.date" }
        //         }
        //     },
        //     {
        //         $sort: {
        //             "client.firstName": 1,
        //             "client.lastName": 1,
        //             "latestAccount": 1
        //         }
        //     },
        //     {
        //         $project: {
        //             // "client._id": 0, // Remove original client _id from projection
        //             client: {
        //                 id: "$client._id",
        //                 firstName: "$client.firstName",
        //                 lastName: "$client.lastName",
        //                 joiningDate: "$client.joiningDate",
        //             },
        //             package: {
        //                 id: "$client.package._id",
        //                 name: "$client.package.name",
        //                 amount: "$client.package.amount",
        //                 clientAmount: "$client.amount",
        //             },
        //             account: {
        //                 lastPaidDate: "$latestAccount",
        //                 status: {
        //                     $cond: {
        //                         if: { $ifNull: ["$latestAccount", false] },
        //                         then: {
        //                             $cond: {
        //                                 if: {
        //                                     $lte: ["$latestAccount", {
        //                                         $subtract: [new Date(), 30 * 24 * 60 * 60 * 1000]
        //                                     }]
        //                                 },
        //                                 then: "arrears",
        //                                 else: "good"
        //                             }
        //                         },
        //                         else: "pending"
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // ]);

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

        res.status(200).json({
            records: data ? await formatClientResponse(data) : [],
            recordCount: recordCount
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const formatClientResponse = async (data) => {
    const clientPackageList = await getClientPackageList();
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

const get = async (req, res) => {
    try {
        const data = await db.Accounts.find({ client: req.params.id })
            .populate("client")
            .lean();

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const create = async (req, res) => {
    try {

        const { payload, error } = validateAndRespond(schema, req.body);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }
        if (Array.isArray(payload)) {
            const data = await Promise.all(req.body.map(async (item) => {
                const newItem = new db.Accounts(item);
                return await newItem.save();
            }));
            res.status(201).json(data);
        } else {
            const data = new db.Accounts(payload);
            await data.save();
            res.status(201).json(data);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const edit = async (req, res) => {
    try {
        const data = await db.Accounts.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!data) {
            return res.status(404).send("Client not found");
        }
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const deleteItem = async (req, res) => {
    try {
        const data = await db.Accounts.delete({ _id: req.params.id });
        if (!data) {
            return res.status(404).send("Account not found");
        }
        res.send("Account deleted");
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

module.exports = { getAll, get, create, edit, deleteItem };