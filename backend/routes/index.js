
const routes = (app) => {
    require("./subscription.routes")(app);
    require("./user.routes")(app);
    require("./billing.routes")(app);
    require("./client.routes")(app);
    require("./notification.routes")(app);
    require("./packages.routes")(app);
    require("./checkins/generalCheckins.routes")(app);
    require("./checkins/weighingCheckins.routes")(app);
};

module.exports = routes;

