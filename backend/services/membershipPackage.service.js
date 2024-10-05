const db = require("../models");

exports.updateMembershipPackage = async (id, payload, session) => {
    console.log("update membershipPackage", { id, payload });
    return db.MembershipPackage.findOneAndUpdate(
        { _id: id },
        {
            $set: {
                clients: payload.clients,
                package: payload.package,
                amount: payload.amount,
                paymentDay: payload.paymentDay,
                joiningDate: payload.joiningDate
            }
        },
        { upsert: true, new: true, session });
};

exports.createMembershipPackage = async (payload, session) => {
    const membershipPackage = new db.MembershipPackage({ ...payload });
    return membershipPackage.save({ session });
};

exports.getMembershipPackageByClient = async (clientId) => {
    return db.MembershipPackage.findOne({ client: clientId });
};

exports.getMembershipPackageByPackage = async (packageId) => {
    return db.MembershipPackage.findOne({ package: packageId });
};