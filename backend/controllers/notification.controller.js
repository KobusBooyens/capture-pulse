// eslint-disable-next-line no-undef
const db = require("../models");
const { z } = require("zod");
const validateAndRespond = require("../utils/zodValidation");

const schema = z.object({
    client: z.string({ required_error: "client is required" }),
    severity: z.enum(["error", "info", "warning"], { required_error: "severity is required" }),
    title: z.string({ required_error: "title is required" }),
    description: z.string({ required_error: "description is required" }),
    actioned: z.boolean({ required_error: "actioned is required" })
});

const getAll = async (req, res) => {
    try {
        const data = await db.Notifications.find({});
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const get = async (req, res) => {
    try {
        const schema = z.object({
            id: z.string({ required_error: "id is required" })
        });

        const { payload, error } = validateAndRespond(schema, req.params);

        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }

        const data = await db.Notifications.findById(payload.id);
        if (!data) {
            return res.status(404).send("Notification not found");
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
                const newItem = new db.Notifications(item);
                return await newItem.save();
            }));
            res.status(201).json(data);
        } else {
            const data = new db.Notifications(payload);
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
        const { payload, error } = validateAndRespond(schema, req.body);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }

        const data = await db.Notifications.findByIdAndUpdate(req.params.id, payload);
        if (!data) {
            return res.status(404).send("Notification not found");
        }
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const deleteItem = async (req, res) => {
    try {
        const data = await db.Notifications.delete({ _id: req.params.id });
        if (!data) {
            return res.status(404).send("Notification not found");
        }
        res.send("Notification deleted");
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

module.exports = { getAll, get, create, edit, deleteItem };