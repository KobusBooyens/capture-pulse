import { apiClient } from "../api-client.js";
import useCustomMutation from "../shared/useCustomMutation.js";
import queryKeys from "./useQueryKeys.js";

const deleteClientNoteFn = async ({ id }) => {
    return await apiClient.delete(`/client/notes/${id}`);
};

const useDeleteClientNote = () => {
    return useCustomMutation(deleteClientNoteFn, queryKeys.PAGINATED, {
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
