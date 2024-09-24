const controller = require("../controllers/billing/billing.controller");
const { verifyToken } = require("../middleware/authJwt");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.get("/api/billing", verifyToken, controller.getAllBilling);
    app.get("/api/billing/:id", verifyToken, controller.getBilling);
    app.post("/api/billing", verifyToken, controller.createBilling);
    app.patch("/api/billing/:id", verifyToken, controller.updateBilling);
    app.delete("/api/billing/:id", verifyToken, controller.deleteBilling);
};