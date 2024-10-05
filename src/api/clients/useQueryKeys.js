export const queryKey = "clients";
const queryKeys = {
    PAGINATED: [queryKey, "pagination"],
    SEARCH: [queryKey, "search"],
    DETAIL: [queryKey, "detail"],
    DROPDOWN: [queryKey, "dropdown"]
};

export default queryKeys;