import { apiClient } from "../api-client.js";
import useCustomMutation from "../_shared/useCustomMutation";
import queryKeys from "./useQueryKeys.js";

const createClientNoteFn = async (data) => {
    const response = await apiClient.post("/client/notes", data);
    return response.data;
};

const deleteClientNoteFn = async ({ id }) => {
    return await apiClient.delete(`/client/notes/${id}`);
};

const useClientNote = () => {
    return useCustomMutation(createClientNoteFn, "DETAIL", {
        success: {
            title: "Success!",
            content: "Nice! Note was successfully created!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while creating the note. Please try again!",
            severity: "error"
        },
    });
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

export { useClientNote, useDeleteClientNote };
