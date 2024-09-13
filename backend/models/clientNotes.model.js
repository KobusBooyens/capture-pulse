const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const schema = new mongoose.Schema(
    {
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clients",
            required: true
        },
        note: {
            type: String,
            required: true
        }
    }, {
        collection: "clientNotes",
        timestamps: true
    }
);

schema.index({ client: 1 });

schema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true, overrideMethods: "all" });
const ClientNotes = mongoose.model("ClientNotes", schema);
module.exports = ClientNotes;