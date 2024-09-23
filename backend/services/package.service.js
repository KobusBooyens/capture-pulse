const db = require("../models");

exports.getAllPackages = async (subscriptionId) => {
    return db.Packages.find({ subscription: subscriptionId });
};

exports.getPackage = async (id) => {
    return db.Packages.findOne({ _id: id });
};

exports.createPackage = async (subscriptionId, payload) => {
    const record = new db.Packages({
        ...payload,
        subscription: subscriptionId
    });
    return await record.save();
};

exports.updatePackage = async (id, payload) => {
    return db.Packages.findOneAndUpdate({ _id: id }, { $set: { ...payload } });
};

exports.deletePackage = async (id) => {
    return db.Packages.delete({ _id: id });
};