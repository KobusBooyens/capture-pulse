import checkinQueryKeys from "./useQueryKeys.js";
import useCustomFetch from "../shared/useCustomFetch.js";
import { useLocation, useParams } from "react-router-dom";

const useCheckins = (type) => {
    const { id } = useParams();

    return useCustomFetch(checkinQueryKeys.detail(id, type), `/checkins/${type}/client/${id}`);
};

export default useCheckins;
