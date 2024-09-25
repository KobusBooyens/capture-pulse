import useCustomFetch from "../_shared/useCustomFetch.js";
import queryKeys from "./useQueryKeys.js";

const useGetAllTaskReminders = () => {
    return useCustomFetch(queryKeys.ALL, "/taskReminders");
};

export { useGetAllTaskReminders };