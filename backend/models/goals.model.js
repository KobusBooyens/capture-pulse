const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        subscription: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subscriptions",
            required: true
        }
    }, {
        collection: "goals",
        timestamps: true
    }
);

schema.index({ name: 1 });

schema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true, overrideMethods: "all" });
const Goals = mongoose.model("Goals", schema);
module.exports = Goals;