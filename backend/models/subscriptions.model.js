const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        currency: {
            type: String,
            required: true
        },
        numberOfUsers: {
            type: Number,
            default: 0
        },
        active: {
            type: Boolean,
            default: false
        },
        activatedDateTime: {
            type: Date
        }
    }, {
        collection: "subscriptions",
        timestamps: true
    }
);

schema.index({ name: 1 }, { unique: true });

schema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true, overrideMethods: "all" });
const Subscriptions = mongoose.model("Subscriptions", schema);
module.exports = Subscriptions;