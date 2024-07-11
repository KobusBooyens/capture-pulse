import { useParams } from "react-router-dom";
import checkinQueryKeys from "./useQueryKeys.js";
import useCustomFetch from "../shared/useCustomFetch.js";

const useCheckin = () => {
    const { id } = useParams();
    return useCustomFetch(checkinQueryKeys.detail(Number(id)), `checkins/${id}`);
};

export default useCheckin;