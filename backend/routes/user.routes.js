const controller = require("../controllers/user.controller");
const { verifyToken } = require("../middleware/authJwt");

module.exports = function (app) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.get("/api/user/:id", controller.getUserById);
    app.get("/api/users/paginated", verifyToken, controller.getPaginatedUsers);
    app.get("/api/users", verifyToken, controller.getAllUsers);
    app.post("/api/user", controller.createUser);
    app.patch("/api/user/:id", controller.updateUser);
    app.delete("/api/user/:id", verifyToken, controller.deleteUser);
};