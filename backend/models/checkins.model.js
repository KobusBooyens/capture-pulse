const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const schema = new mongoose.Schema(
    {
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clients",
            required: true
        },
        type: {
            type: String,
            enum: ["pulse", "weighing"],
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        mood: {
            type: Number
        },
        weight: {
            type: String
        },
        feedback: {
            type: String,
            required: true
        }
    }, {
        collection: "checkins",
        timestamps: true
    }
);

schema.index({ name: 1 });

schema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true, overrideMethods: "all" });
const Checkins = mongoose.model("Checkins", schema);
module.exports = Checkins;