const db = require("../../models");
const { z } = require("zod");
const validateAndRespond = require("../../utils/zodValidation");
const { formatResponse } = require("./_shared");

const schema = z.object({
    client: z.string({ required_error: "client is required" }),
    date: z.string({ required_error: "date is required" }),
    mood: z.optional(z.number({ required_error: "mood is required" })),
    feedback: z.string({ required_error: "feedback is required" })
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

        let queryFilter = { client: req.params.id };

        if (payload.searchText) {
            queryFilter["$or"] = [
                { date: { $regex: ".*" + payload.searchText + ".*", $options: "i", }, },
                { mood: { $regex: ".*" + payload.searchText + ".*", $options: "i", }, }
            ];
        }

        let sortFilter = {};
        if (payload.sortColumn && payload.sortDirection) {
            const sortDirection = payload.sortDirection === "asc" ? 1 : -1;

            if (payload.sortColumn === "date") {
                sortFilter = { date: sortDirection };
            } else if (payload.sortColumn === "mood") {
                sortFilter = { "mood": sortDirection };
            }
        }

        const [ data, recordCount ] = await Promise.all([
            db.GeneralCheckins.find(queryFilter)
                .populate("client")
                .sort(sortFilter)
                .limit(pageSize)
                .skip(pageSize * (page - 1))
                .lean(),
            db.GeneralCheckins.countDocuments(queryFilter)
        ]);

        return res.status(200).json({
            records: data && data?.length ? formatResponse(data) : [],
            recordCount: recordCount
        });

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
        const { payload, error } = validateAndRespond(schema, req.body);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }
        const data = await db.GeneralCheckins.updateOne({ _id: req.params.id },
            { ...payload });
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
