const rootQueryKey = "dashboard";

const queryKeys = {
    clientInsights: [rootQueryKey, "clientInsights"],

    clientDailyInsights: [rootQueryKey, "clientDailyInsights"],
    clientWeeklyInsights: [rootQueryKey, "clientWeeklyInsights"],
    clientMonthlyInsights: [rootQueryKey, "clientMonthlyInsights"],

    checkinInsights: [rootQueryKey, "checkinInsights"],
    billingInsights: [rootQueryKey, "billingInsights"],
};

export default queryKeys;