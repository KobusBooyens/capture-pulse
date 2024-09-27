const DashboardService = require("../services/dashboard.service");

const getClientSummary = async (req, res) => {
    try {
        const response = await DashboardService.getClientSummary(req.subscriptionId);
        res.status(200).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const getClientWeeklySummary = async (req, res) => {
    try {
        const response = await DashboardService.getClientWeeklySummary(req.subscriptionId);
        res.status(200).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const getClientMonthlySummary = async (req, res) => {
    try {
        const response = await DashboardService.getClientMonthlySummary(req.subscriptionId);
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
    getClientSummary, getClientWeeklySummary, getClientMonthlySummary,
    getCheckinSummary, getBillingSummary
};