const DashboardService = require("../services/dashboard.service");
const { z } = require("zod");
const validateAndRespond = require("../utils/zodValidation");

const getClientSummary = async (req, res) => {
    try {
        const response = await DashboardService.getClientSummary(req.subscriptionId);
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

const getCheckinSummary = async (req, res) => {
    try {
        const response = await DashboardService.getCheckinSummary();
        res.status(200).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const getBillingSummary = async (req, res) => {
    try {
        const response = await DashboardService.getBillingSummary();
        res.status(200).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

module.exports = {
    getClientSummary,
    getClientDailyInsights, getClientWeeklyInsights, getClientMonthlyInsights,
    getCheckinSummary, getBillingSummary
};