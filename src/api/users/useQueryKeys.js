export const queryKey = "users";
const queryKeys = {
    PAGINATED: [queryKey, "pagination"],
    SEARCH: [queryKey, "search"],
    DETAIL: [queryKey, "detail"],
    ALL: [queryKey, "all"]
};

export default queryKeys;