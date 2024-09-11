const billingController = require("../controllers/billing/billing.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.get("/api/billing", billingController.getAll);
    app.get("/api/billing/:id", billingController.get);
    app.post("/api/billing", billingController.create);
    app.patch("/api/billing/:id", billingController.edit);
    app.delete("/api/billing/:id", billingController.deleteItem);
};