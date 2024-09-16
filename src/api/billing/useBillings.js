import queryKeys from "./useQueryKeys.js";
import useCustomFetch from "../_shared/useCustomFetch.js";
import { buildUrlParams } from "../api-client.js";

const useBillings = (page, pageSize, searchText, sortColumn, sortDirection) => {
    const url = "/billing?"+
      `${buildUrlParams(page, pageSize, searchText, sortColumn, sortDirection)}`;

    return useCustomFetch([...queryKeys.PAGINATED, url], url);
};

export default useBillings;
