const controller = require("../controllers/dashboard.controller");
const { verifyToken } = require("../middleware/authJwt");

module.exports = function (app) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.get("/api/dashboard/client-summary", verifyToken, controller.getClientSummary);
    app.get("/api/dashboard/client-weekly-summary", verifyToken, controller.getClientWeeklySummary);
    app.get("/api/dashboard/client-monthly-summary", verifyToken, controller.getClientMonthlySummary);

    app.get("/api/dashboard/checkin-summary", verifyToken, controller.getCheckinSummary); 
    app.get("/api/dashboard/billing-summary", verifyToken, controller.getBillingSummary); 
};