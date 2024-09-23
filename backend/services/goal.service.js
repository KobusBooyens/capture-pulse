const db = require("../models");

exports.getAllGoals = async (subscriptionId) => {
    return db.Goals.find({ subscription: subscriptionId });
};

exports.getGoal = async (id) => {
    return db.Goals.findOne({ _id: id });
};

exports.createGoal = async (subscriptionId, payload) => {
    const record = new db.Goals({
        ...payload,
        subscription: subscriptionId
    });
    return await record.save();
};

exports.deleteGoal = async (id) => {
    return db.Goals.delete({ _id: id });
};