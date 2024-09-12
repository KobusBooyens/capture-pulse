import { useParams } from "react-router-dom";
import queryKeys from "./useQueryKeys.js";
import useCustomFetch from "../shared/useCustomFetch.js";
import { buildUrlParams } from "../api-client.js";

const useBilling = (page, pageSize, searchText, sortColumn, sortDirection) => {
    const { id } = useParams();
    const url = `/billing/${id}?`+
      `${buildUrlParams(page, pageSize, searchText, sortColumn, sortDirection)}`;

    return useCustomFetch([...queryKeys.PAGINATED, url], url);
};

export default useBilling;