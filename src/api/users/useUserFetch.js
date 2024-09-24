import { buildUrlParams } from "../api-client.js";
import useCustomFetch from "../_shared/useCustomFetch.js";
import queryKeys from "../clients/useQueryKeys.js";

const useGetAllUsers = ({ page, pageSize, searchText, sortColumn, sortDirection }) => {
    const url = `/users?${buildUrlParams(page, pageSize, searchText, sortColumn, sortDirection)}`;

    return useCustomFetch([...queryKeys.PAGINATED, url], url);
};

export { useGetAllUsers };

