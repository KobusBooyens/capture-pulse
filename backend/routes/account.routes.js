const accountController = require("../controllers/account.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.get("/api/accounts", accountController.getAll);
    app.get("/api/accounts/:id", accountController.get);
    app.post("/api/accounts", accountController.create);
    app.patch("/api/accounts/:id", accountController.edit);
    app.delete("/api/accounts/:id", accountController.deleteItem);
};