import useCustomFetch from "../shared/useCustomFetch.js";
import { useParams } from "react-router-dom";
import { buildUrlParams } from "../api-client.js";
import clientQueryKeys from "../clients/useQueryKeys.js";

const useCheckins = (type, page, pageSize, searchText, sortColumn, sortDirection) => {
    const { id } = useParams();
    const url = `/checkins/${type}/client/${id}?`+
      `${buildUrlParams(page, pageSize, searchText, sortColumn, sortDirection)}`;

    return useCustomFetch([...clientQueryKeys.PAGINATED, url], url);
};

export default useCheckins;
