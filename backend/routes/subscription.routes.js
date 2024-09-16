const controller = require("../controllers/subscription.controller");

module.exports = function (app) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.get("/api/subscriptions", controller.getAllSubscriptions);
    app.get("/api/subscription/:id", controller.verifySubscription);
    app.post("/api/subscription", controller.createSubscription);
};