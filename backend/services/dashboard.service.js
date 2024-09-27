const dayjs = require("dayjs");
const localizedFormat = require("dayjs/plugin/localizedFormat");
const db = require("../models");

dayjs.extend(localizedFormat);
dayjs().format("L LT");

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

exports.getClientWeeklySummary = async (subscription) => {
    const startOfWeek = dayjs().startOf("week").add(1, "d").format("YYYY/MM/DD");
    const endOfWeek = dayjs().endOf("week").add(1, "d").format("YYYY/MM/DD");

    console.log("getClientWeeklySummary", { startOfWeek, endOfWeek });
    const data = await db.Client.aggregate([
        { $match: {
            subscription: subscription,
            joiningDate: { $gte: dayjs(startOfWeek).toDate(), $lte: dayjs(endOfWeek).toDate() }
        } },
        { $project: {
            dayOfWeek: { $dayOfWeek: "$joiningDate" } // 1 = Sunday, 7 = Saturday
        } },
        { $group: {
            _id: "$dayOfWeek",
            count: { $sum: 1 }
        } },
        { $sort: { _id: 1 } }
    ]);

    // const dayMapping = ["S", "M", "T", "W", "T", "F", "S"];
    return data?.map(({ _id, count }) => ({
        day: _id,
        count
    }));
};

exports.getClientMonthlySummary = async (subscription) => {

};

exports.getCheckinSummary = async (subscription) => {

};

exports.getBillingSummary = async (subscription) => {

};