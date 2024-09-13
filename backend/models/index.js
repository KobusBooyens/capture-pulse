const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;

db.Client = require("./clients.model");
db.ClientNotes = require("./clientNotes.model");
db.Notifications = require("./notifications.model");
db.Packages = require("./packages.model");
db.ClientPackage = require("./clientPackage.model");
db.Checkins = require("./checkins.model");
db.GeneralCheckins = require("./generalCheckins.model");
db.WeighingCheckins = require("./weighingCheckins.model");
db.Billing = require("./billing.model");

module.exports = db;