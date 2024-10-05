const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const schema = new mongoose.Schema(
    {
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clients",
            required: true
        },
        goal: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Goals",
        },
        weight: {
            type: Number,
        },
        height: {
            type: Number,
        },
        membershipPackage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MembershipPackage",
            required: true,
        },
    }, {
        collection: "memberships",
        timestamps: true
    }
);

schema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true, overrideMethods: "all" });
const Memberships = mongoose.model("Memberships", schema);
module.exports = Memberships;