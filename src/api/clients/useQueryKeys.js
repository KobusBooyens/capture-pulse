export const queryKey = "clients";
const queryKeys = {
    PAGINATED: [queryKey, "pagination"],
    SEARCH: [queryKey, "search"],
    DETAIL: [queryKey, "detail"]
};

export default queryKeys;