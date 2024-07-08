const packageController = require("../controllers/packages.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.get("/api/packages", packageController.getAll);
    app.get("/api/packages/:id", packageController.get);
    app.post("/api/packages", packageController.create);
    app.patch("/api/packages/:id", packageController.edit);
    app.delete("/api/packages/:id", packageController.deleteItem);
};