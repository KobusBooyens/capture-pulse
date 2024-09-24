const controller = require("../controllers/clients.controller");
const { verifyToken } = require("../middleware/authJwt");

module.exports = function (app) {
    app.use(function (req, res, next) {

        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.get("/api/clients", verifyToken, controller.getAllClients);
    app.get("/api/clients/:id", verifyToken, controller.getClient);
    app.post("/api/clients", verifyToken, controller.createClient);
    app.patch("/api/clients/:id", verifyToken, controller.updateClient);
    app.delete("/api/clients/:id", verifyToken, controller.deleteClient);

    app.post("/api/client/notes", verifyToken, controller.createClientNote);
    app.delete("/api/client/notes/:id", verifyToken, controller.deleteClientNote);
};