import useCustomFetch from "../shared/useCustomFetch.js";
import { useParams } from "react-router-dom";
import { buildUrlParams } from "../api-client.js";
import checkinQueryKeys from "../clients/useQueryKeys.js";

const useCheckins = (type, page, pageSize, searchText, sortColumn, sortDirection) => {
    const url = `/checkins/${type}?`+
      `${buildUrlParams(page, pageSize, searchText, sortColumn, sortDirection)}`;

    return useCustomFetch([...checkinQueryKeys.PAGINATED, url], url);
};

export default useCheckins;
