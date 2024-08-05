const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const schema = new mongoose.Schema(
    {
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clients",
            required: true
        },
        package: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Packages",
            required: true
        },
        amount: {
            type: String,
            required: true
        }
    }, {
        collection: "clientPackage",
        timestamps: true
    }
);

schema.index({ name: 1 });

schema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true, overrideMethods: "all" });
const ClientPackage = mongoose.model("ClientPackage", schema);
module.exports = ClientPackage;