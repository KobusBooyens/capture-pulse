import { buildUrlParams } from "../api-client.js";
import useCustomFetch from "../_shared/useCustomFetch.js";
import queryKeys from "./useQueryKeys.js";

const useGetPaginatedUsers = ({ page, pageSize, searchText, sortColumn, sortDirection }) => {
    const url = `/users/paginated?${buildUrlParams(page, pageSize, searchText, sortColumn, sortDirection)}`;
    return useCustomFetch([...queryKeys.PAGINATED, url], url);
};

const useGetUsers = () => {
    return useCustomFetch(queryKeys.ALL, "/users");
};

export { useGetPaginatedUsers, useGetUsers };

