const jwt = require("jsonwebtoken");
const db = require("../models");
const authConfig = require("../config/auth.config");

const verifyToken = (req, res, next) => {
    let token = req.headers["authorization"];
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    const bearerToken = token.split(" ")[1];
    jwt.verify(bearerToken, authConfig.JWT_SECRET, async(err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }

        try {
            const user = await db.Users.findOne({ _id: decoded.id })
                .populate("subscription");

            req.userId = user._id;
            req.subscriptionId = user.subscription._id;
            next();
        } catch (err) {
            if (err) {
                res.status(500).send({ message: err });
            }
        }
    });
};

module.exports = {
    verifyToken
};