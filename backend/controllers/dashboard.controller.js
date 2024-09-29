const DashboardService = require("../services/dashboard.service");
const { z } = require("zod");
const validateAndRespond = require("../utils/zodValidation");

const getClientInsights = async (req, res) => {
    try {
        const response = await DashboardService.getClientInsights(req.subscriptionId);
        res.status(200).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const getClientDailyInsights = async (req, res) => {
    try {
        const response = await DashboardService.getClientDailyInsights(req.subscriptionId);
        res.status(200).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const getClientWeeklyInsights = async (req, res) => {
    try {
        const response = await DashboardService.getClientWeeklyInsights(req.subscriptionId);
        res.status(200).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const clientMonthlyInsightsSchema = z.object({
    months: z.string({ required_error: "months is required" })
});

const getClientMonthlyInsights = async (req, res) => {
    try {
        const { payload, error } = validateAndRespond(clientMonthlyInsightsSchema, req.query);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }
        const response = await DashboardService.getClientMonthlyInsights(req.subscriptionId, payload);
        res.status(200).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const getCheckinInsights = async (req, res) => {
    try {
        const response = await DashboardService.getCheckinInsights(req.subscriptionId);
        res.status(200).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const getBillingInsights = async (req, res) => {
    try {
        const response = await DashboardService.getBillingInsights();
        res.status(200).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

module.exports = {
    getClientInsights,
    getClientDailyInsights, getClientWeeklyInsights, getClientMonthlyInsights,
    getCheckinInsights, getBillingInsights
};