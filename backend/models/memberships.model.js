const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const schema = new mongoose.Schema(
    {
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clients",
            required: true
        },
        joiningDate: {
            type: Date,
            required: true,
        },
        paymentDay: {
            type: Number,
            required: true,
        },
        goal: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Goals",
            required: true
        },
        weight: {
            type: Number,
            required: true,
        },
        height: {
            type: Number,
            required: true
        },
        status: {
            type: Number,
            default: 0
        },
        package: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Packages",
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