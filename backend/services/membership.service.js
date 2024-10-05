const db = require("../models");
const MembershipPackageService = require("../services/membershipPackage.service");
const ClientService = require("../services/client.service");
const { startSession } = require("mongoose");

exports.getMembershipByClient = async (clientId) => {
    return db.Memberships
        .findOne({ client: clientId })
        .lean();
};

exports.updateMembership = async (id, payload) => {
    const session = await startSession();
    session.startTransaction();

    try {
        let membership;
        console.log("updateMembership", payload?.clients);
        const membershipPackage = await MembershipPackageService.updateMembershipPackage(
            payload.membershipPackage,
            {
                clients: payload?.clients?.length > 0 ? [ ...payload.clients, payload.client] : [],
                package: payload.package,
                amount: payload.amount,
                paymentDay: payload.paymentDay,
                joiningDate: payload.joiningDate
            },
            session);
        
        membership = await db.Memberships.findOneAndUpdate(
            { _id: id },
            { $set: {
                weight: payload.weight,
                height: payload.height,
                goal: payload.goal,
                membershipPackage: payload.membershipPackage ?? membershipPackage._id,
                client: payload.client,
            } },
            { upsert: true, new: true, session });

        if (payload.client) {
            await db.Client.findOneAndUpdate(
                { _id: payload.client },
                { $set: { membership: membership } },
                { session });
        }

        if (payload?.clients?.length > 0) {
            await linkClientMemberships(payload.clients, payload.membershipPackage, session);
        }

        await session.commitTransaction();
        return membership;
    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        await session.endSession();
    }
};

const linkClientMemberships = async (clients, membershipPackage, session) => {
    for (const client of clients) {
        console.log("client", client);
        let clientMembership = await this.getMembershipByClient(client);
        console.log("client|clientMembership b", clientMembership);
        if (!clientMembership) {
            clientMembership = new db.Memberships({
                client: client,
                membershipPackage: membershipPackage
            });
            console.log("client|clientMembership a", clientMembership);
            await clientMembership.save({ session });
        }
    }
};

exports.createMembership = async (payload) => {
    const session = await startSession();
    session.startTransaction();

    try {
        const membershipPackage = await MembershipPackageService.createMembershipPackage({
            clients: payload?.clients?.length > 0 ? [ ...payload.clients, payload.client] : [],
            package: payload.package,
            amount: payload.amount,
            paymentDay: payload.paymentDay,
            joiningDate: payload.joiningDate
        });

        const membership = new db.Memberships({
            client: payload.client,
            goal: payload.goal,
            membershipPackage: membershipPackage,
            weight: payload.weight,
            height: payload.height
        } );

        await membership.save({ session });

        await ClientService.updateClient(payload.client, { membership: membership });

        if (payload?.clients?.length > 0) {
            await linkClientMemberships(payload.clients, membershipPackage._id, session);
        }

        await session.commitTransaction();
        return membership;
    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        await session.endSession();
    }
};

exports.deleteMembership = async (id) => {
    return db.Memberships.delete({ _id: id });
};