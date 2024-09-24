const db = require("../../models");
const { z } = require("zod");
const validateAndRespond = require("../../utils/zodValidation");
const CheckinService = require("../../services/checkin.service");

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

const getAllGeneralCheckins = async (req, res) => {
    try {
        const { payload, error } = validateAndRespond(basicSchema, req.query);
        if (error) {
            return res.status(400).send({ message: "Validation failed.", errors: error });
        }

        const response = await CheckinService.getAllGeneralCheckins(req.subscriptionId, payload);
        
        return res.status(200).send(response);

    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const getGeneralCheckin = async (req, res) => {
    try {
        const { payload, error } = validateAndRespond(basicSchema, req.query);
        if (error) {
            return res.status(400).send({ message: "Validation failed.", errors: error });
        }
        
        const data = await CheckinService.getGeneralCheckin(req.params.clientId, payload);

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const createGeneralCheckin = async (req, res) => {
    try {
        const { payload, error } = validateAndRespond(schema, req.body);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }
        const response = await CheckinService.createGeneralCheckin(payload);
        res.status(200).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const updateGeneralCheckin = async (req, res) => {
    try {
        const { payload, error } = validateAndRespond(schema, req.body);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }
        const response = await CheckinService.updateGeneralCheckin(req.params.id, payload);
        res.status(200).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const deleteGeneralCheckin = async (req, res) => {
    try {
        const data = await db.GeneralCheckins.delete({ _id: req.params.id });
        if (!data) {
            return res.status(404).send("general checkin not found");
        }
        res.status(200).send("General Checkin deleted");
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

module.exports = {
    getAllGeneralCheckins,
    getGeneralCheckin,
    createGeneralCheckin,
    updateGeneralCheckin,
    deleteGeneralCheckin,
};
