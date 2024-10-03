const controller = require("../controllers/membership.controller");
const { verifyToken } = require("../middleware/authJwt");

module.exports = function (app) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.get("/api/memberships", verifyToken, controller.getPaginatedMembership);
    app.get("/api/membership/:clientId", verifyToken, controller.getMembershipByClient);
    app.post("/api/membership", verifyToken, controller.createMembership);
    app.patch("/api/membership/:id", verifyToken, controller.updateMembership);
    app.delete("/api/membership/:id", verifyToken, controller.deleteMembership);
};