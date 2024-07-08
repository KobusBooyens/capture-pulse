const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const schema = new mongoose.Schema(
    {
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clients",
            required: true
        },
        severity: {
            type: String,
            enum: ["error", "info", "warning", "success"],
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        actioned: {
            type: Boolean,
            default: false
        },
        dateTimeCreated: {
            type: Date,
            default: new Date()
        },
        dateTimeActioned: {
            type: Date
        }
    }, {
        collection: "notifications",
        timestamps: true
    }
);

schema.index({ client: 1 });
schema.index({ severity: 1 });

schema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true, overrideMethods: "all" });
const Notifications = mongoose.model("Notifications", schema);
module.exports = Notifications;