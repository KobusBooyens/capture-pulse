const dayjs = require("dayjs");
const localizedFormat = require("dayjs/plugin/localizedFormat");
const isoWeek = require("dayjs/plugin/isoWeek");
const db = require("../models");
const { ObjectId } = require("mongodb");

dayjs.extend(localizedFormat);
dayjs.extend(isoWeek);

exports.getClientInsights = async (subscription) => {
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

    return data;
};

exports.getClientDailyInsights = async (subscription) => {
    const startOfWeek = dayjs().startOf("week").format("YYYY/MM/DD");
    const endOfWeek = dayjs().endOf("week").format("YYYY/MM/DD");

    const data = await db.Client.aggregate([
        { $match: {
            subscription: subscription,
            joiningDate: { $gte: dayjs(startOfWeek).toDate(), $lte: dayjs(endOfWeek).toDate() }
        } },
        { $project: {
            dayOfWeek: { $dayOfWeek: "$joiningDate" } // [ 1: Sunday, 7: Saturday ]
        } },
        { $group: {
            _id: "$dayOfWeek",
            count: { $sum: 1 }
        } },
        { $sort: { _id: 1 } }
    ]);

    return data?.map(({ _id, count }) => ({
        day: _id,
        count
    }));
};

// exports.getClientDailyInsights = async (subscription) => {
//     const startOfWeek = dayjs().startOf("week").toDate();
//     const endOfWeek = dayjs().endOf("week").toDate();
//
//     console.log("getClientDailyInsights", { startOfWeek, endOfWeek });
//
//     const data = await db.Client.aggregate([
//         // Match clients based on subscription and joining date within the week
//         {
//             $match: {
//                 subscription: subscription,
//                 $or: [
//                     { joiningDate: { $gte: startOfWeek, $lte: endOfWeek } }, // Joined this week
//                     { deletedAt: { $gte: startOfWeek, $lte: endOfWeek } } // Left this week
//                 ]
//             }
//         },
//         {
//             // Project the day of week for both joining and deletion dates
//             $project: {
//                 dayOfWeek: {
//                     $cond: {
//                         if: { $gte: ["$deletedAt", startOfWeek] },
//                         then: { $dayOfWeek: "$deletedAt" }, // Day of the week they were deleted
//                         else: { $dayOfWeek: "$joiningDate" } // Day of the week they joined
//                     }
//                 },
//                 isDeleted: {
//                     $cond: { if: { $gte: ["$deletedAt", startOfWeek] }, then: true, else: false }
//                 }
//             }
//         },
//         {
//             // Group by the day of week and whether they are deleted or new
//             $group: {
//                 _id: { dayOfWeek: "$dayOfWeek", isDeleted: "$isDeleted" },
//                 count: { $sum: 1 }
//             }
//         },
//         {
//             // Sort by the day of the week
//             $sort: { "_id.dayOfWeek": 1 }
//         }
//     ]);
//
//     // Process and return the data
//     return data.map(({ _id, count }) => ({
//         day: _id.dayOfWeek,
//         count,
//         type: _id.isDeleted ? "totalLeft" : "totalNew"
//     }));
// };

exports.getClientWeeklyInsights = async (subscription) => {
    const startOfMonth = dayjs().startOf("month");
    const endOfMonth = dayjs().endOf("month").add(1, "d");
    const weeksInMonth = [];

    let currentWeekStart = startOfMonth.startOf("week");
    let currentWeekEnd = currentWeekStart.endOf("week");
    let weekNumber = 1;

    while (currentWeekStart.isBefore(endOfMonth)) {
        if (currentWeekEnd.isAfter(endOfMonth)) {
            currentWeekEnd = endOfMonth;
        }

        const data = await db.Client.aggregate([
            { $match: {
                subscription: subscription,
                joiningDate: { $gte: currentWeekStart.toDate(), $lte: currentWeekEnd.toDate() }
            } },
            { $group: {
                _id: null,
                totalCount: { $sum: 1 }
            } }
        ]);

        const totalCount = data?.[0]?.totalCount || 0;

        weeksInMonth.push({
            weekNumber,
            weekStart: currentWeekStart.format("YYYY-MM-DD"),
            weekEnd: currentWeekEnd.format("YYYY-MM-DD"),
            totalCount
        });

        currentWeekStart = currentWeekStart.add(1, "week");
        currentWeekEnd = currentWeekStart.endOf("week");
        weekNumber++;
    }

    return weeksInMonth;
};

exports.getClientMonthlyInsights = async (subscription, payload) => {
    const { months } = payload;
    const endDate = dayjs();
    const startDate = endDate.subtract(parseInt(months), "months").startOf("month");
    const monthsInRange = [];

    for (let month = 0; month < parseInt(months); month++) {
        const currentMonthStart = startDate.add(month + 1, "month").startOf("month");
        const currentMonthEnd = currentMonthStart.endOf("month");

        const data = await db.Client.aggregate([
            { $match: {
                subscription: subscription,
                joiningDate: { $gte: currentMonthStart.toDate(), $lte: currentMonthEnd.toDate() }
            } },
            { $group: {
                _id: null,
                totalCount: { $sum: 1 }
            } }
        ]);

        const totalCount = data?.[0]?.totalCount || 0;

        monthsInRange.push({
            monthNumber: currentMonthStart.month() + 1,
            totalCount
        });
    }

    return monthsInRange;
};

exports.getCheckinInsights = async (subscription) => {
    const startOfWeek = dayjs().startOf("week").toDate();
    const endOfWeek = dayjs().endOf("week").toDate();

    const totalClients = await db.Client.countDocuments({ subscription: subscription });

    const totalCheckinsAggregation = await db.GeneralCheckins.aggregate([
        { $lookup: {
            from: "clients",
            localField: "client",
            foreignField: "_id",
            as: "clientInfo"
        } },
        { $unwind: "$clientInfo" },
        { $match: {
            "clientInfo.subscription": new ObjectId(subscription),
            date: {
                $gte: startOfWeek,
                $lt: endOfWeek
            }
        } },
        { $count: "totalCheckins" }
    ]);

    return {
        totalClients,
        totalCheckins: totalCheckinsAggregation[0]?.totalCheckins,
        totalRemaining: totalClients - totalCheckinsAggregation[0]?.totalCheckins
    };
};

exports.getBillingInsights = async (subscription) => {

};