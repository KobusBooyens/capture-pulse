const DashboarService = require("../services/dashboard.service");

const getClientSummary = async (req, res) => {
    try {
        const response = await DashboarService.getClientSummary(req.subscriptionId);
        res.status(200).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const getCheckinSummary = async (req, res) => {
    try {
        const response = await DashboarService.getCheckinSummary();
        res.status(200).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const getBillingSummary = async (req, res) => {
    try {
        const response = await DashboarService.getBillingSummary();
        res.status(200).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

module.exports = {
    getClientSummary, getCheckinSummary, getBillingSummary
};