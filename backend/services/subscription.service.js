const db = require("../models");
const { ObjectId } = require("mongodb");

exports.createSubscription = async (payload) => {
    const exists = await db.Subscriptions.exists({ name: payload.name });
    if (exists) {
        return { status: 400, data: "Subscription already exists" };
    }
    const subscription = new db.Subscriptions({
        name: payload.name
    });

    const result = await subscription.save();
    return { status: 201, data: result };
};

exports.getAllSubscription = async () => {
    return db.Subscriptions.find({});
};

exports.getSubscription = async (id) => {
    return db.Subscriptions.findOne({ _id: id });
};

exports.updateSubscription = async (id, payload) => {
    return db.Subscriptions.findOneAndUpdate({ _id: id }, { $set: { ...payload } });
};

exports.verifySubscription = async (subscriptionId) => {
    if (!ObjectId.isValid(subscriptionId)) {
        return {
            status: 404,
            data: "Subscription code is not valid. Please re-enter the code or contact your administrator"
        };
    }
    const subscription = await db.Subscriptions.findOne({ _id: subscriptionId });

    if (!subscription) {
        return {
            status: 404,
            data: "Subscription code is not valid"
        };
    }

    if (subscription.active) {
        return {
            status: 400,
            data: "Subscription code is already active. Please try and sign-in."
        };
    }

    // const response = await db.Subscriptions.findOneAndUpdate(
    //     { _id: subscriptionId },
    //     { $set: {
    //         active: true,
    //         activatedDateTime: new Date()
    //     } });

    return {
        status: 200,
        data: subscription
    };
};

exports.addUserToSubscription = async (subscriptionId, activateSubscription = false, session = null) => {
    const subscription = await db.Subscriptions.findOne({ _id: subscriptionId }).lean();
    if (!subscription) {
        return {
            status: 404,
            data: "Subscription not found"
        };
    }

    const updateQuery = {
        numberOfUsers: parseInt(subscription.numberOfUsers) + 1
    };

    if (activateSubscription) {
        updateQuery.active = true;
    }

    const response = await db.Subscriptions.findOneAndUpdate(
        { _id: subscriptionId },
        { $set: updateQuery },
        { session });

    return {
        status: 200,
        data: response
    };
};

