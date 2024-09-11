const { z } = require("zod");
const db = require("../../models");
const validateAndRespond = require("../../utils/zodValidation");
const BillingService = require("../../services/billing.service")
;
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
        const response = await BillingService.getAll(payload);
        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const get = async (req, res) => {
    try {
        const { payload, error } = validateAndRespond(basicSchema, req.query);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }

        const response = await BillingService.get(req.params.id, payload);
        res.status(200).json(response);
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
                const newItem = new db.Billing(item);
                return await newItem.save();
            }));
            res.status(201).json(data);
        } else {
            const data = new db.Billing(payload);
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
        const data = await db.Billing.updateOne({ _id: req.params.id },
            { ...payload });
        if (!data) {
            return res.status(404).send("weighing checkin not found");
        }
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const deleteItem = async (req, res) => {
    try {
        const data = await db.Billing.delete({ _id: req.params.id });
        if (!data) {
            return res.status(404).send("Billing record not found");
        }
        res.send("Billing record deleted");
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

module.exports = { getAll, get, create, edit, deleteItem };