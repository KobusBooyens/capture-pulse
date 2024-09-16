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

exports.verifySubscription = async (subscriptionId) => {
    console.log("subscriptionId", subscriptionId);
    if (!ObjectId.isValid(subscriptionId)) {
        return {
            status: 404,
            data: "Subscription code is not valid. Please re-enter the code or contact your administrator"
        };
    }
    const subscription = await db.Subscriptions.findOne({ _id: subscriptionId });
    console.log("exists", subscription);
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
