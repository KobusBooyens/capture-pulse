import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSnackbar from "../../hooks/useSnackbar.js";

const useCustomMutation = (mutationFn, queryKey, alertMessage = {}) => {
    const queryClient = useQueryClient();
    const { showSnackBar } = useSnackbar();
    const { success, error } = alertMessage;
    return useMutation({
        mutationFn,
        onMutate: async (data) => {
            await queryClient.cancelQueries(queryKey);
            const previousData = queryClient.getQueryData(queryKey);
            return { previousData, data };
        },
        onError: (err, data, context) => {
            showSnackBar(error.title, error.content, error.severity, new Date());
            queryClient.setQueryData(queryKey, context.previousData);
        },
        onSuccess: () => {
            showSnackBar(success.title, success.content, success.severity, new Date());
        },
        onSettled: () => {
            queryClient.invalidateQueries(queryKey);
        },
    });
};

export default useCustomMutation;

