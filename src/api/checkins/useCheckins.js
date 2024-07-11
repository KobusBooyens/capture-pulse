import checkinQueryKeys from "./useQueryKeys.js";
import useCustomFetch from "../shared/useCustomFetch.js";
import { useLocation, useParams } from "react-router-dom";

const useCheckins = () => {
    const { id } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get("type");

    return useCustomFetch(checkinQueryKeys.detail(id, type), `/checkins/client/${id}?type=${type}`);
};

export default useCheckins;
