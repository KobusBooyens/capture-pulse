const controller = require("../controllers/packages.controller");
const { verifyToken } = require("../middleware/authJwt");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.get("/api/packages", verifyToken, controller.getAllPackages);
    app.get("/api/package/:id", verifyToken, controller.getPackage);
    app.post("/api/package", verifyToken, controller.createPackage);
    app.patch("/api/package/:id", verifyToken, controller.updatePackage);
    app.delete("/api/package/:id", verifyToken, controller.deletePackage);
};