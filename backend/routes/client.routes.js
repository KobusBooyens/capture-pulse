const controller = require("../controllers/clients.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {

        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.get("/api/clients", controller.getAll);
    app.get("/api/clients/:id", controller.get);
    app.post("/api/clients", controller.create);
    app.patch("/api/clients/:id", controller.edit);
    app.delete("/api/clients/:id", controller.deleteItem);

    app.post("/api/client/notes", controller.createClientNote);
    app.delete("/api/client/notes/:id", controller.deleteClientNote);
};