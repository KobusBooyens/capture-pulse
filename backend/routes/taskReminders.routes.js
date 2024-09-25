const controller = require("../controllers/taskReminders.controller");
const { verifyToken } = require("../middleware/authJwt");

module.exports = function (app) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.get("/api/taskReminders", verifyToken, controller.getAllTaskReminders);
    app.post("/api/taskReminder", verifyToken, controller.createTaskReminder);
    app.patch("/api/taskReminder/:id", verifyToken, controller.updateTaskReminder);
    app.delete("/api/taskReminder/:id", verifyToken, controller.deleteTaskReminder);
};