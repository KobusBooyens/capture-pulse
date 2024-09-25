export const queryKey = "taskReminders";
const queryKeys = {
    PAGINATED: [queryKey, "pagination"],
    ALL: [queryKey, "all"],
    SEARCH: [queryKey, "search"],
    DETAIL: [queryKey, "detail"]
};

export default queryKeys;