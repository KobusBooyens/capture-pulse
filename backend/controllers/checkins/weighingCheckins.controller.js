const { z } = require("zod");
const validateAndRespond = require("../../utils/zodValidation");
const CheckinService = require("../../services/checkin-weighing.service");

const schema = z.object({
    client: z.string({ required_error: "client is required" }),
    date: z.string({ required_error: "date is required" }),
    weight: z.optional(z.string({ required_error: "weight is required" })),
    feedback: z.string({ required_error: "feedback is required" })
});

const basicSchema = z.object({
    page: z.string({ required_error: "page is required" }),
    pageSize: z.string({ required_error: "pageSize is required" }),
    searchText: z.string().optional(),
    sortColumn: z.string().optional(),
    sortDirection: z.string().optional(),
});

const getAllWeighingCheckins = async (req, res) => {
    try {
        const { payload, error } = validateAndRespond(basicSchema, req.query);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }

        const response = await CheckinService.getAllWeighingCheckins(req.subscriptionId, payload);

        return res.status(200).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const getWeighingCheckin = async (req, res) => {
    try {
        const { payload, error } = validateAndRespond(basicSchema, req.query);
        if (error) {
            return res.status(400).send({ message: "Validation failed.", errors: error });
        }

        const data = await CheckinService.getWeighingCheckin(req.params.clientId, payload);

        res.status(200).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const createWeighingCheckin = async (req, res) => {
    try {
        const { payload, error } = validateAndRespond(schema, req.body);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }

        const response = CheckinService.createWeighingCheckin(payload);
        res.status(201).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const updateWeighingCheckin = async (req, res) => {
    try {
        const { payload, error } = validateAndRespond(schema, req.body);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }
        const response = await CheckinService.updateWeighingCheckin(req.params.id, payload);
        res.status(200).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const deleteWeighingCheckin = async (req, res) => {
    try {
        await CheckinService.deleteItem(req.params.id);
        res.status(200).send("Weighing Checkin deleted");
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

module.exports = {
    getAllWeighingCheckins,
    getWeighingCheckin,
    createWeighingCheckin,
    updateWeighingCheckin,
    deleteWeighingCheckin,
};
