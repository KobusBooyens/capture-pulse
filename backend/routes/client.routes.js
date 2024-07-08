const clientsController = require("../controllers/clients.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {

        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.get("/api/clients", clientsController.getAll);
    app.get("/api/clients/:id", clientsController.get);
    app.post("/api/clients", clientsController.create);
    app.patch("/api/clients/:id", clientsController.edit);
    app.delete("/api/clients/:id", clientsController.deleteItem);
};