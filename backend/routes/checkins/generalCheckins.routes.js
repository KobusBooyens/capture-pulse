const generalCheckinsController = require("../../controllers/checkins/generalCheckins.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {

        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.get("/api/checkins/general/client/:id", generalCheckinsController.getAll);
    app.get("/api/checkins/general/:id", generalCheckinsController.get);
    app.post("/api/checkins/general/", generalCheckinsController.create);
    app.patch("/api/checkins/general/:id", generalCheckinsController.edit);
    app.delete("/api/checkins/general/:id", generalCheckinsController.deleteItem);
};