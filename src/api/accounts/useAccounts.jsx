import queryKeys from "./useQueryKeys.js";
import useCustomFetch from "../shared/useCustomFetch.js";
import { buildUrlParams } from "../api-client.js";

const useAccounts = (page, pageSize, searchText, sortColumn, sortDirection) => {
    const url = "/accounts?"+
      `${buildUrlParams(page, pageSize, searchText, sortColumn, sortDirection)}`;
    console.log("useAccounts", url);
    return useCustomFetch([...queryKeys.PAGINATED, url], url);
};

export default useAccounts;
