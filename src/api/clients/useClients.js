import clientQueryKeys from "./useQueryKeys.js";
import useCustomFetch from "../shared/useCustomFetch.js";
import { buildUrlParams } from "../api-client.js";

const useClients = ({ page, pageSize, searchText, sortColumn, sortDirection }) => {
    const url = `/clients?${buildUrlParams(page, pageSize, searchText, sortColumn, sortDirection)}`;

    return useCustomFetch([...clientQueryKeys.PAGINATED, url], url);
};
export default useClients;