import clientQueryKeys from "./useQueryKeys.js";
import useCustomFetch from "../shared/useCustomFetch.js";

const useClients = ({ page, pageSize, searchText, sortColumn, sortDirection }) => {
    const params = new URLSearchParams({ page: page + 1, pageSize });
    if (searchText) { params.set("searchText", searchText); }
    if (sortColumn) { params.set("sortColumn", sortColumn); }
    if (sortDirection) { params.set("sortDirection", sortDirection); }

    const url = `/clients?${params.toString()}`;

    return useCustomFetch([...clientQueryKeys.PAGINATED, url], url);
};
export default useClients;