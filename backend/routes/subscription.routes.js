const controller = require("../controllers/subscription.controller");
const { verifyToken } = require("../middleware/authJwt");

module.exports = function (app) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.get("/api/subscriptions", verifyToken, controller.getAllSubscriptions);
    app.get("/api/subscription", verifyToken, controller.getSubscription);
    app.get("/api/subscription/verify/:id", verifyToken, controller.verifySubscription);

    app.post("/api/subscription", verifyToken, controller.createSubscription);
    app.patch("/api/subscription", verifyToken, controller.updateSubscription);

};