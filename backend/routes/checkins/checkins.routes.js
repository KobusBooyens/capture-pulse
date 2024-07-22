const checkinsController = require("../../controllers/checkins/checkins.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {

        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.get("/api/checkins/client/:id", checkinsController.getAll);
    app.get("/api/checkins/:id", checkinsController.get);
    app.post("/api/checkins", checkinsController.create);
    app.patch("/api/checkins/:id", checkinsController.edit);
    app.delete("/api/checkins/:id", checkinsController.deleteItem);
};