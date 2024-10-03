import { buildUrlParams } from "../api-client.js";
import useCustomFetch from "../_shared/useCustomFetch.js";
import queryKeys from "../clients/useQueryKeys.js";
import { useParams } from "react-router-dom";

const usePaginatedMembership = ({ page, pageSize, searchText, sortColumn, sortDirection }) => {
    const url = `/memberships?${buildUrlParams(page, pageSize, searchText, sortColumn, sortDirection)}`;

    return useCustomFetch([...queryKeys.PAGINATED, url], url);
};

const useMembership = (clientId) => {
    return useCustomFetch(queryKeys.DETAIL, `membership/${clientId}`);
};

export { usePaginatedMembership, useMembership };