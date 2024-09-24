import { useParams } from "react-router-dom";
import queryKeys from "./useQueryKeys.js";
import useCustomFetch from "../_shared/useCustomFetch.js";
import { buildUrlParams } from "../api-client.js";

const useClient = () => {
    const { id } = useParams();
    return useCustomFetch(queryKeys.DETAIL, `clients/${id}`);
};

const useClients = ({ page, pageSize, searchText, sortColumn, sortDirection }) => {
    const url = `/clients?${buildUrlParams(page, pageSize, searchText, sortColumn, sortDirection)}`;

    return useCustomFetch([...queryKeys.PAGINATED, url], url);
};

export { useClient, useClients } ;
