export const queryKey = "subscriptions";
const queryKeys = {
    PAGINATED: [queryKey, "pagination"],
    SEARCH: [queryKey, "search"],
    DETAIL: [queryKey, "detail"]
};

export default queryKeys;