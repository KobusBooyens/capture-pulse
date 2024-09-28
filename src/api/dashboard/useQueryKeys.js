const rootQueryKey = "dashboard";

const queryKeys = {
    clientSummary: [rootQueryKey, "clientSummary"],

    clientDailyInsights: [rootQueryKey, "clientDailyInsights"],
    clientWeeklyInsights: [rootQueryKey, "clientWeeklyInsights"],
    clientMonthlyInsights: [rootQueryKey, "clientMonthlyInsights"],

    checkinSummary: [rootQueryKey, "checkinSummary"],
    billing: [rootQueryKey, "billingSummary"],
};

export default queryKeys;