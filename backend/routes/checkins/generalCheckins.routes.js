const controller = require("../../controllers/checkins/generalCheckins.controller");
const { verifyToken } = require("../../middleware/authJwt");

module.exports = function (app) {
    app.use(function (req, res, next) {

        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.get("/api/checkins/general", verifyToken, controller.getAllGeneralCheckins);
    app.get("/api/checkins/general/:clientId", verifyToken, controller.getGeneralCheckin);
    app.post("/api/checkins/general/", verifyToken, controller.createGeneralCheckin);
    app.patch("/api/checkins/general/:id", verifyToken, controller.updateGeneralCheckin);
    app.delete("/api/checkins/general/:id", verifyToken, controller.deleteGeneralCheckin);
};