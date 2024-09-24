const controller = require("../../controllers/checkins/weighingCheckins.controller");
const { verifyToken } = require("../../middleware/authJwt");

module.exports = function (app) {
    app.use(function (req, res, next) {

        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.get("/api/checkins/weighing", verifyToken, controller.getAllWeighingCheckins);
    app.get("/api/checkins/weighing/:clientId", verifyToken, controller.getWeighingCheckin);
    app.post("/api/checkins/weighing/", verifyToken, controller.createWeighingCheckin);
    app.patch("/api/checkins/weighing/:id", verifyToken, controller.updateWeighingCheckin);
    app.delete("/api/checkins/weighing/:id", verifyToken, controller.deleteWeighingCheckin);
};