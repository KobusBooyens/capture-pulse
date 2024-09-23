const controller = require("../controllers/goals.controller");
const { verifyToken } = require("../middleware/authJwt");

module.exports = function (app) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.get("/api/goals", verifyToken, controller.getAllGoals);
    app.get("/api/goal/:id", verifyToken, controller.getGoal);
    app.post("/api/goal", verifyToken, controller.createGoal);
    app.delete("/api/goal/:id", verifyToken, controller.deleteGoal);
};