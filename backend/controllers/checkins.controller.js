const db = require("../models");
const { z } = require("zod");
const validateAndRespond = require("../utils/zodValidation");

const schema = z.object({
    client: z.string({ required_error: "client is required" }),
    type: z.enum(["pulse", "weighing"], { required_error: "type is required" }),
    date: z.string({ required_error: "date is required" }),
    mood: z.optional(z.number({ required_error: "mood is required" })),
    weight: z.optional(z.string({ required_error: "weight is required" })),
    feedback: z.string({ required_error: "feedback is required" })
});

const getAll = async (req, res) => {
    try {
        const schema = z.object({
            type: z.enum(["pulse", "weighing"], { required_error: "type is required" }),
        });

        const { payload, error } = validateAndRespond(schema, req.query);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }

        const data = await db.Checkins.find({ client: req.params.id, type: payload.type })
            .populate("client")
            .lean();
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const get = async (req, res) => {
    try {
        const data = await db.Checkins.findById(req.params.id)
            .populate("client")
            .lean();
        if (!data) {
            return res.status(404).send("Client not found");
        }
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
                const newItem = new db.Checkins(item);
                return await newItem.save();
            }));
            res.status(201).json(data);
        } else {
            const data = new db.Checkins(payload);
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
        const data = await db.Checkins.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
        const data = await db.Checkins.delete({ _id: req.params.id });
        if (!data) {
            return res.status(404).send("Client not found");
        }
        res.send("Client deleted");
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

module.exports = { getAll, get, create, edit, deleteItem };
