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
        weight: {
            type: String
        },
        feedback: {
            type: String,
            required: true
        }
    }, {
        collection: "weighingCheckins",
        timestamps: true
    }
);

schema.index({ name: 1 });

schema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true, overrideMethods: "all" });
const WeighingCheckins = mongoose.model("WeighingCheckins", schema);
module.exports = WeighingCheckins;