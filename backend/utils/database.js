const mongoose = require("mongoose");

const uri = "mongodb+srv://capturePulseAdmin:eLCyKc10XmyYc7bw@capturepulsecluster0.ksjyoua.mongodb.net/?retryWrites=true&w=majority&appName=CapturePulseCluster0"; // replace with your actual connection string

async function connectToDatabase() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true
        });
        console.log("Successfully connected to MongoDB!");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        throw err;
    }
}

module.exports = { connectToDatabase };
