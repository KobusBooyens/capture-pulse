const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const { boolean } = require("zod");

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        numberOfUsers: {
            type: Number,
            required: true
        },
        active: {
            type: Boolean,
            default: false
        },
    }, {
        collection: "subscriptions",
        timestamps: true
    }
);

// schema.index({ _id: 1 });

schema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true, overrideMethods: "all" });
const Subscriptions = mongoose.model("Subscriptions", schema);
module.exports = Subscriptions;