const db = require("../models");
const { verifyPassword } = require("../controllers/utils");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");
const { ObjectId } = require("mongodb");

exports.signIn = async (payload) => {
    const user = await db.Users.findOne({ email: payload.email });
    if (!user) {
        return {
            status: 401,
            data: {
                message: "Invalid credentials provided. " +
                  "Please ensure that you have entered the correct email address."
            }
        };
    }

    const password = await verifyPassword(payload.password, user.password);
    if (!password) {
        return {
            status: 401,
            data: {
                authToken: null,
                message: "Invalid credentials provided. Please check email and password combination."
            }
        };
    }

    await db.Users.findOneAndUpdate(
        { _id: user._id },
        { $set: {
            loggedIn: true,
            lastLoggedIn: Date.now()
        } });

    const authToken = jwt.sign({ id: user.id }, authConfig.JWT_SECRET , {
        expiresIn: "7d"
    });

    const userData = await db.Users.findOne({ _id: user._id })
        .populate({ path: "subscription", select: "name" })
        .select("firstName lastName email loggedIn")
        .lean();

    return {
        status: 200,
        data: {
            authToken: authToken,
            user: userData
        }
    };
};

exports.signOut = async (id) => {
    if (!ObjectId.isValid(id)) {
        return {
            status: 401,
            data: { message:"Id does not exists. Could not sign out." }
        };
    }

    const user = await db.Users.exists({ _id: id });

    if (!user) {
        return {
            status: 401,
            data: { message: "User does not exists. Could not sign out." }
        };
    }

    await db.Users.findOneAndUpdate(
        { _id: id },
        { $set: {
            loggedIn: false,
            lastLoggedIn: Date.now()
        } });

    return {
        status: 200,
        data: { message: "Signed out!" }
    };
};