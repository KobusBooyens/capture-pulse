const db = require("../models");
const SubscriptionService = require("../services/subscription.service");
const { hashPassword } = require("../controllers/utils");
const { startSession } = require("mongoose");
const { ObjectId } = require("mongodb");

exports.createUser = async (payload) => {
    const session = await startSession();
    session.startTransaction();

    try {
        const userExists = await db.Users.findOne({ email: payload.email });
        if (userExists) {
            return {
                status: 400,
                data: {
                    message: "An account with this email address already exists",
                    field: "email"
                }
            };
        }

        const subOwnerCount = await db.Users.countDocuments({
            subscription: new ObjectId(payload.subscriptionCode),
            isSubscriptionOwner: true
        });
        console.log("subOwnerCount", subOwnerCount);
        if (subOwnerCount > 0) {
            return {
                status: 400,
                data: {
                    message: "A subscription account owner already exists. Please consider signing-in.",
                    action: "signUpError"
                }
            };
        }

        const response = await SubscriptionService.addUserToSubscription(
            payload.subscriptionCode, payload.activateSubscription, session);
        if (response.status !== 200) {
            return response;
        }

        const user = new db.Users({
            firstName: payload.firstName,
            lastName: payload.lastName,
            contactNumber: payload.contactNumber,
            email: payload.email,
            password: await hashPassword(payload.password),
            subscription: payload.subscriptionCode,
            isSubscriptionOwner: payload.isSubscriptionOwner
        });

        await user.save({ session });

        await session.commitTransaction();
        return {
            status: 201,
            data: user
        };
    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        await session.endSession();
    }
};