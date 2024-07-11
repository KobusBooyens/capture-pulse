import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "../../hooks/useToast.jsx";

const useCustomMutation = (mutationFn, queryKey, messages = {}) => {
    const queryClient = useQueryClient();
    const { showToast } = useToast();

    return useMutation({
        mutationFn,
        onMutate: async (data) => {
            await queryClient.cancelQueries(queryKey);
            const previousData = queryClient.getQueryData(queryKey);
            return { previousData, data };
        },
        onError: (err, data, context) => {
            showToast(messages.error || "An error occurred", "error");
            queryClient.setQueryData(queryKey, context.previousData);
        },
        onSuccess: () => {
            showToast(messages.success || "Operation was successful");
        },
        onSettled: () => {
            queryClient.invalidateQueries(queryKey);
        },
    });
};

export default useCustomMutation;

