const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const schema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: String
        },
        lastName: {
            type: String,
            required: String
        },
        dob: {
            type: Date,
            // required: true
        },
        gender: {
            type: String,
            required: true
        },
        email: {
            type: String,
            // required: true
        },
        contactNumber: {
            type: String,
            required: true,
        },
        subscription: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subscriptions",
            required: true
        },
        agent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
        membership: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Memberships",
        },
        latestPaidDate: {
            type: mongoose.Schema.Types.Date
        },
        latestCheckinDate: {
            type: mongoose.Schema.Types.Date
        },
        latestWeighingDate: {
            type: mongoose.Schema.Types.Date
        }
    }, {
        collection: "clients",
        timestamps: true
    }
);

schema.index({ email: 1 }, { unique: true });

schema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true, overrideMethods: "all" });
const Clients = mongoose.model("Clients", schema);
module.exports = Clients;