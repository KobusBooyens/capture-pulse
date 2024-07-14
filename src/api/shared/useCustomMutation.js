import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSnackbar from "../../hooks/useSnackbar.js";

const useCustomMutation = (mutationFn, queryKey, messages = {}) => {
    const queryClient = useQueryClient();
    const { showSnackBar } = useSnackbar();

    return useMutation({
        mutationFn,
        onMutate: async (data) => {
            await queryClient.cancelQueries(queryKey);
            const previousData = queryClient.getQueryData(queryKey);
            return { previousData, data };
        },
        onError: (err, data, context) => {
            showSnackBar("Failed to add client", "An error has occurred while adding client, please try again.",
                "error");
            queryClient.setQueryData(queryKey, context.previousData);
        },
        onSuccess: () => {
            showSnackBar("Client successfully added", "Nice! You have added a client.", "success");
        },
        onSettled: () => {
            queryClient.invalidateQueries(queryKey);
        },
    });
};

export default useCustomMutation;

