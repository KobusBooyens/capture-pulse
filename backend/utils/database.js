const mongoose = require("mongoose");
const dbConfig = require("../config/db.config");

async function connectToDatabase() {
    try {
        await mongoose.connect(dbConfig.DATABASE_URL, {
            useNewUrlParser: true
        });
        console.log("Successfully connected to MongoDB!");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        throw err;
    }
}

module.exports = { connectToDatabase };
