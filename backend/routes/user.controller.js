const controller = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.get("/api/user/:id", controller.getUserById);
    app.get("/api/user", controller.getUser);
    app.post("/api/user", controller.createUser);
    app.path("/api/user", controller.updateUser);
    app.delete("/api/user", controller.deleteUser);
};