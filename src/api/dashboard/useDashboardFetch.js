import useCustomFetch from "../_shared/useCustomFetch.js";
import queryKeys from "./useQueryKeys.js";

const useDashboardClientSummary = () => {
    return useCustomFetch(queryKeys.clientSummary, "/dashboard/client-summary");
};

const useDashboardClientWeeklySummary = () => {
    return useCustomFetch(queryKeys.clientWeeklySummary, "/dashboard/client-weekly-summary");
};

const useDashboardCheckinSummary = () => {
    return useCustomFetch(queryKeys.checkinSummary, "/dashboard/checkin-summary");
};

const useDashboardBillingSummary = () => {
    return useCustomFetch(queryKeys.checkinSummary, "/dashboard/billing-summary");
};

export {
    useDashboardClientSummary,
    useDashboardClientWeeklySummary,
    useDashboardCheckinSummary, useDashboardBillingSummary };