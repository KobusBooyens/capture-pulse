import { useLocation, useParams } from "react-router-dom";
import checkinQueryKeys from "./useQueryKeys.js";
import useCustomFetch from "../shared/useCustomFetch.js";

const useCheckin = () => {
    const { id } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get("type");
    return useCustomFetch(checkinQueryKeys.detail(Number(id)), `checkins/${type}/${id}`);
};

export default useCheckin;