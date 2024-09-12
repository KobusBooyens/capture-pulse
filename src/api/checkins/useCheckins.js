import useCustomFetch from "../shared/useCustomFetch.js";
import { buildUrlParams } from "../api-client.js";
import queryKeys from "../clients/useQueryKeys.js";

const useCheckins = (type, page, pageSize, searchText, sortColumn, sortDirection) => {
    const url = `/checkins/${type}?`+
      `${buildUrlParams(page, pageSize, searchText, sortColumn, sortDirection)}`;

    return useCustomFetch([...queryKeys.PAGINATED, url], url);
};

export default useCheckins;
