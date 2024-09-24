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

const getAllBilling = async (req, res) => {
    try {
        const { payload, error } = validateAndRespond(basicSchema, req.query);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }

        const response = await BillingService.getAllBilling(req.subscriptionId, payload);

        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const getBilling = async (req, res) => {
    try {
        const { payload, error } = validateAndRespond(basicSchema, req.query);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }

        const response = await BillingService.getBilling(req.params.id, payload);

        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const createBilling = async (req, res) => {
    try {
        const { payload, error } = validateAndRespond(schema, req.body);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }

        const response = await BillingService.createBilling(payload);

        res.status(201).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const updateBilling = async (req, res) => {
    try {
        const { payload, error } = validateAndRespond(schema, req.body);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }
        const response = await BillingService.updateBilling(req.params.id, payload);
        // const data = await db.Billing.updateOne({ _id: req.params.id },
        //     { ...payload });
        // if (!data) {
        //     return res.status(404).send("weighing checkin not found");
        // }
        res.status(200).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const deleteBilling = async (req, res) => {
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

module.exports = { getAllBilling, getBilling, createBilling, updateBilling, deleteBilling };