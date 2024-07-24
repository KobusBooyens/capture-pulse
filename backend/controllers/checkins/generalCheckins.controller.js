const db = require("../../models");
const { z } = require("zod");
const validateAndRespond = require("../../utils/zodValidation");

const schema = z.object({
    client: z.string({ required_error: "client is required" }),
    date: z.string({ required_error: "date is required" }),
    mood: z.optional(z.number({ required_error: "mood is required" })),
    feedback: z.string({ required_error: "feedback is required" })
});

const getAll = async (req, res) => {
    try {
        const schema = z.object({
            //searching by client, date range, mood
            searchText: z.string().optional(),
        });

        const { payload, error } = validateAndRespond(schema, req.query);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }

        const data = await db.GeneralCheckins.find({ client: req.params.id })
            .populate("client")
            .lean();

        const response = {
            client: {
                firstName: data[0].client.firstName,
                lastName: data[0].client.lastName,
                contactNumber: data[0].client.contactNumber,
            },
            records: data.map(r => {
                return {
                    _id: r._id,
                    date: r.date,
                    mood: r.mood,
                    feedback: r.feedback
                };
            })
        };
        
        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const get = async (req, res) => {
    try {
        const data = await db.GeneralCheckins.findById(req.params.id)
            .populate("client")
            .lean();
        if (!data) {
            return res.status(404).send("general checkin not found");
        }
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const create = async (req, res) => {
    try {
        console.log(req.body);
        const { payload, error } = validateAndRespond(schema, req.body);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }
        if (Array.isArray(payload)) {
            const data = await Promise.all(req.body.map(async (item) => {
                const newItem = new db.GeneralCheckins(item);
                return await newItem.save();
            }));
            res.status(201).json(data);
        } else {
            const data = new db.GeneralCheckins(payload);
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
        const data = await db.GeneralCheckins.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!data) {
            return res.status(404).send("general checkin not found");
        }
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const deleteItem = async (req, res) => {
    try {
        const data = await db.GeneralCheckins.delete({ _id: req.params.id });
        if (!data) {
            return res.status(404).send("general checkin not found");
        }
        res.send("General Checkin deleted");
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

module.exports = {
    getAll,
    get,
    create,
    edit,
    deleteItem,
};