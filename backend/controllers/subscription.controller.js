const { z } = require("zod");
const validateAndRespond = require("../utils/zodValidation");
const SubscriptionService = require("../services/subscription.service");

const schema = z.object({
    name: z.string({ required_error: "name is required" })
});

const getAllSubscriptions = async (req, res) => {
    try {
        const response = await SubscriptionService.getAllSubscription();
        res.status(200).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const createSubscription = async (req, res) => {
    try {
        const { payload, error } = validateAndRespond(schema, req.body);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }
        const response = await SubscriptionService.createSubscription(payload);
        res.status(response.status).send(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const verifySubscription = async (req, res) => {
    try {
        const response = await SubscriptionService.verifySubscription(req.params.id);
        res.status(response.status).send(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

module.exports = { createSubscription, verifySubscription, getAllSubscriptions };