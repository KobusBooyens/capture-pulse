import { apiClient } from "../api-client.js";
import checkinQueryKeys from "./useQueryKeys.js";
import useCustomMutation from "../shared/useCustomMutation.js";

const createCheckinFn = async (payload) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const { type } = payload;
    const response = await apiClient.post(`/checkins/${type}`, payload.data);
    return response.data;
};

const useCreateCheckin = () => {
    return useCustomMutation(createCheckinFn, checkinQueryKeys.PAGINATED, {
        success: {
            title: "Success!",
            content: "Nice! Check-in done!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while adding the check-in. Please try again!",
            severity: "error"
        },
    });
};

export default useCreateCheckin;

