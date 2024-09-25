const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const schema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true
        },
        subscription: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subscriptions",
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        dateTime: {
            type: Date,
        },
        teamTaskReminder : {
            type: Boolean,
            default: false
        }
    }, {
        collection: "taskReminders",
        timestamps: true
    }
);

schema.index({ name: 1 });

schema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true, overrideMethods: "all" });
const TaskReminders = mongoose.model("TaskReminders", schema);
module.exports = TaskReminders;