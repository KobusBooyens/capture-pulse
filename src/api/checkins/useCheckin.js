import { useParams } from "react-router-dom";
import queryKeys from "./useQueryKeys.js";
import useCustomFetch from "../_shared/useCustomFetch.js";
import { buildUrlParams } from "../api-client.js";

const useCheckin = (type, page, pageSize, searchText, sortColumn, sortDirection) => {
    const { id } = useParams();
    const url = `/checkins/${type}/${id}?`+
      `${buildUrlParams(page, pageSize, searchText, sortColumn, sortDirection)}`;
    console.log("useCheckin", url);
    return useCustomFetch([...queryKeys.PAGINATED, url], url);
};

export default useCheckin;