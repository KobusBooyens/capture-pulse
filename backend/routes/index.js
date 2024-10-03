
const routes = (app) => {
    require("./subscription.routes")(app);
    require("./dashboard.routes")(app);
    require("./client.routes")(app);
    require("./membership.routes")(app);
    require("./taskReminders.routes")(app);
    require("./goals.routes")(app);
    require("./user.routes")(app);
    require("./auth.routes")(app);
    require("./billing.routes")(app);
    require("./notification.routes")(app);
    require("./packages.routes")(app);
    require("./checkins/generalCheckins.routes")(app);
    require("./checkins/weighingCheckins.routes")(app);
};

module.exports = routes;

