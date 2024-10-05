const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const schema = new mongoose.Schema(
    {
        package: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Packages",
            required: true
        },
        clients: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Clients",
                required: true
            }
        ],
        joiningDate: {
            type: Date,
            required: true,
        },
        paymentDay: {
            type: Number,
            required: true,
        },
        amount: {
            type: String,
            required: true
        },
        status: {
            type: Number,
            default: 0
        },
    }, {
        collection: "membershipPackage",
        timestamps: true
    }
);

schema.index({ client: 1 });

schema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true, overrideMethods: "all" });
const MembershipPackage = mongoose.model("MembershipPackage", schema);
module.exports = MembershipPackage;