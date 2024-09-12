const weighingCheckinsController = require("../../controllers/checkins/weighingCheckins.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {

        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.get("/api/checkins/weighing", weighingCheckinsController.getAll);
    app.get("/api/checkins/weighing/:clientId", weighingCheckinsController.get);
    app.post("/api/checkins/weighing/", weighingCheckinsController.create);
    app.patch("/api/checkins/weighing/:id", weighingCheckinsController.edit);
    app.delete("/api/checkins/weighing/:id", weighingCheckinsController.deleteItem);
};