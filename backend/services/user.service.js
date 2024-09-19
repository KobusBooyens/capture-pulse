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

        if (payload.isSubscriptionOwner) {
            const subOwnerCount = await db.Users.countDocuments({
                subscription: new ObjectId(payload.subscriptionCode),
                isSubscriptionOwner: true
            });

            if (subOwnerCount > 0) {
                return {
                    status: 400,
                    data: {
                        message: "A subscription account owner already exists. Please consider signing-in.",
                        action: "signUpError"
                    }
                };
            }
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

exports.getAllUsers = async (subscriptionId, payload) => {
    const pageSize = payload.pageSize ? Number(payload.pageSize) : 10;
    const page = payload.page ? Number(payload.page) : 1;

    let queryFilter = { subscription: subscriptionId };

    if (payload.searchText) {
        queryFilter["$or"] = [
            { firstName: { $regex: ".*" + payload.searchText + ".*", $options: "i", }, },
            { lastName: { $regex: ".*" + payload.searchText + ".*", $options: "i", }, }
        ];
    }

    let sortFilter = { lastLoggedIn: 1, firstName: 1, lastName: 1 };
    if (payload.sortColumn && payload.sortDirection) {
        const sortDirection = payload.sortDirection === "asc" ? 1 : -1;

        if (payload.sortColumn === "firstName") {
            sortFilter = { lastName: sortDirection, firstName: sortDirection };
        } else if (payload.sortColumn === "lastName") {
            sortFilter = { lastName: sortDirection };
        } else if (payload.sortColumn === "lastLoggedIn") {
            sortFilter = { lastLoggedIn: sortDirection };
        }
    }

    const [data, recordCount] = await Promise.all([
        db.Users.find(queryFilter)
            .sort(sortFilter)
            .skip(pageSize * (page - 1))
            .limit(pageSize)
            .select("-password"),
        db.Users.countDocuments(queryFilter)
    ]);

    return {
        status: 200,
        data:       {
            records: data ?? [],
            recordCount: recordCount
        }
    };
};

exports.deleteUser = async (id) => {
    return await db.Users.delete({ _id: id });
};

exports.editUser = async (id, payload) => {
    return db.Users.updateOne({ _id: id },
        { ...payload });

};