import { apiClient } from "../api-client.js";
import checkinQueryKeys from "./useQueryKeys.js";
import useCustomMutation from "../shared/useCustomMutation.js";

const editFn = async ({ id, updatedData, type }) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await apiClient.patch(`checkins/${type}/${id}`, updatedData);
    return response.data;
};

const useEditCheckin = () => {
    return useCustomMutation(editFn, checkinQueryKeys.PAGINATED, {
        success: {
            title: "Success!",
            content: "Nice! Checkin was successfully updated!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while updating the check-in. Please try again!",
            severity: "error"
        },
    });
};

export default useEditCheckin;
