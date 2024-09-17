const db = require("../models");
const { verifyPassword } = require("../controllers/utils");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");

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

    console.log("JWT_SECRET", authConfig.JWT_SECRET);

    const authToken = jwt.sign({ id: user.id }, authConfig.JWT_SECRET , {
        expiresIn: "7d"
    });

    const userData = await db.Users.findOne({ _id: user._id })
        .populate({ path: "subscription", select: "name" })
        .select("firstName lastName email")
        .lean();

    return {
        status: 200,
        data: {
            authToken: authToken,
            user: userData
        }
    };
};