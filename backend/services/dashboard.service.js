const dayjs = require("dayjs");
const db = require("../models");

exports.getClientSummary = async (subscription) => {
    const clients = await db.Client.find({ subscription: subscription });

    const monthStart = dayjs().startOf("month");
    const monthEnd = dayjs().endOf("month");

    const data = clients.reduce((acc, client) => {
        if (client.gender === "Male") {
            acc.totalMales++;
        }
        if (client.gender === "Female") {
            acc.totalFemales++;
        }

        if (dayjs(client.joiningDate) >= monthStart && dayjs(client.joiningDate) <= monthEnd ) {
            acc.totalNew++;
        }

        acc.totalClients++;
        return acc;
    }, { totalClients: 0, totalMales: 0, totalFemales: 0, totalNew: 0 });

    console.log(data);
    return data;
};

exports.getCheckinSummary = async (subscription) => {

};

exports.getBillingSummary = async (subscription) => {

};