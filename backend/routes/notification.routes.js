const notificationController = require("../controllers/notification.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.get("/api/notifications", notificationController.getAll);
    app.get("/api/notifications/:id", notificationController.get);
    app.post("/api/notifications", notificationController.create);
    app.patch("/api/notifications/:id", notificationController.edit);
    app.delete("/api/notifications/:id", notificationController.deleteItem);
};