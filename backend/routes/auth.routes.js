const controller = require("../controllers/auth.controller");
module.exports = function (app) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    // app.get("/api/auth/verify-subscription", controller.verifySubscription);
    // app.get("/api/auth/sign-up", controller.signUp);
    app.post("/api/auth/sign-in", controller.signIn);
};