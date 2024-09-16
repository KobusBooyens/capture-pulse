import { apiClient } from "../api-client.js";
import useCustomMutation from "../_shared/useCustomMutation";

const createClientNoteFn = async (data) => {
    const response = await apiClient.post("/client/notes", data);
    return response.data;
};

const useCreateClientNote = () => {
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

export default useCreateClientNote;
