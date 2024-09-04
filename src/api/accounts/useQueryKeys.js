export const queryKey = "accounts";
const accountsQueryKeys = {
    PAGINATED: [queryKey, "pagination"],
    SEARCH: [queryKey, "search"],
    DETAIL: [queryKey, "detail"]
};

export default accountsQueryKeys;