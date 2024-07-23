import { apiClient } from "../api-client.js";
import checkinQueryKeys from "./useQueryKeys.js";
import useCustomMutation from "../shared/useCustomMutation.js";
import { useLocation } from "react-router-dom";

const createCheckinFn = async (data, type) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await apiClient.post(`/checkins/${type}`, data);
    return response.data;
};

const useCreateCheckin = () => {
    return useCustomMutation(createCheckinFn, checkinQueryKeys.all, {
        success: "Record was successfully added",
        error: "An error occurred while creating record"
    });
};

export default useCreateCheckin;

