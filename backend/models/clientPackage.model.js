const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const schema = new mongoose.Schema(
    {
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

schema.index({ client: 1 });

schema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true, overrideMethods: "all" });
const ClientPackage = mongoose.model("ClientPackage", schema);
module.exports = ClientPackage;