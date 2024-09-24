import { useParams } from "react-router-dom";
import useCustomFetch from "../_shared/useCustomFetch.js";
import queryKeys from "./useQueryKeys.js";

const useGoal = () => {
    const { id } = useParams();
    return useCustomFetch(queryKeys.detail(Number(id)), `goal/${id}`);
};

const useGoals = () => {
    return useCustomFetch(queryKeys.all, "/goals");
};

export { useGoal, useGoals };