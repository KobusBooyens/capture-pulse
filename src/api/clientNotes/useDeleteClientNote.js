import { apiClient } from "../api-client.js";
import useCustomMutation from "../shared/useCustomMutation.js";

const deleteFn = async ({ id }) => {
    return await apiClient.delete(`/client/notes/${id}`);
};

const useDeleteClientNote = () => {
    return useCustomMutation(deleteFn, "PAGINATED", {
        success: {
            title: "Success!",
            content: "Record has been deleted!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while deleting the note. Please try again!",
            severity: "error"
        },
    });
};

export default useDeleteClientNote;
