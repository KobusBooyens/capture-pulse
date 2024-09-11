const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const schema = new mongoose.Schema(
    {
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clients",
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        reference: {
            type: String
        },
    }, {
        collection: "billing",
        timestamps: true
    }
);

schema.index({ client: 1 });

schema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true, overrideMethods: "all" });
const Billing = mongoose.model("Billing", schema);
module.exports = Billing;