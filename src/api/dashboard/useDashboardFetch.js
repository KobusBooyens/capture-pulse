import useCustomFetch from "../_shared/useCustomFetch.js";
import queryKeys from "./useQueryKeys.js";

const useDashboardClientSummary = () => {
    return useCustomFetch(queryKeys.clientSummary, "/dashboard/client-summary");
};

const useDashboardCheckinSummary = () => {
    return useCustomFetch(queryKeys.checkinSummary, "/dashboard/checkin-summary");
};

const useDashboardBillingSummary = () => {
    return useCustomFetch(queryKeys.checkinSummary, "/dashboard/billing-summary");
};

export { useDashboardClientSummary, useDashboardCheckinSummary, useDashboardBillingSummary };