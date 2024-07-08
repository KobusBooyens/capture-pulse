const { z } = require("zod");
const db = require("../models");
const validateAndRespond = require("../utils/zodValidation");

const schema = z.object({
    client: z.string({ required_error: "client is required" }),
    amount: z.string({ required_error: "amount is required" }),
    date: z.string({ required_error: "date is required" }),
    reference: z.string({ required_error: "reference is required" })
});

const getAll = async (req, res) => {
    try {
        const aggregatedResult = await db.Client.aggregate([
            { $project: { "client": "$$ROOT", "_id": 0 } },
            {
                $lookup: {
                    localField: "client.package",
                    from: "packages",
                    foreignField: "_id",
                    as: "package"
                }
            },
            {
                $unwind: {
                    path: "$package",
                    preserveNullAndEmptyArrays: false
                }
            },
            {
                $lookup: {
                    localField: "client._id",
                    from: "accounts",
                    foreignField: "client",
                    as: "account"
                }
            },
            {
                $unwind: {
                    path: "$account",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: "$client._id",
                    client: { $first: "$client" },
                    package: { $first: "$package" },
                    latestAccount: { $max: "$account.date" }
                }
            },
            {
                $sort: {
                    "client.firstName": 1,
                    "client.lastName": 1,
                    "account.date": 1,
                }
            },
            {
                $project: {
                    client: {
                        id: "$client._id",
                        firstName: "$client.firstName",
                        lastName: "$client.lastName",
                        joiningDate: "$client.joiningDate",
                    },
                    package: {
                        id: "$client.package",
                        name: "$package.name",
                        amount: "$package.amount",
                        clientAmount: "$client.amount",
                    },
                    account: {
                        lastPaidDate: "$latestAccount",
                        status: {
                            $cond: {
                                if: { $ifNull: ["$latestAccount", false] }, // Check if latestAccount exists
                                then: {
                                    $cond: {
                                        if: {
                                            $lte: ["$latestAccount", {
                                                $subtract: [new Date(), 30 * 24 * 60 * 60 * 1000]
                                            }]
                                        },
                                        then: "arrears",
                                        else: "good"
                                    }
                                },
                                else: "pending"
                            }
                        }
                    }
                }
            }
        ]);

        res.status(200).json(aggregatedResult);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
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