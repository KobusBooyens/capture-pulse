import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSnackbar from "../../hooks/useSnackbar.js";

const useCustomMutation = (
    mutationFn,
    queryKey,
    alertMessage = {},
    options = {}
) => {
    const queryClient = useQueryClient();
    const { showSnackBar } = useSnackbar();
    const { success, error } = alertMessage;

    const {
        onSuccess = () => {},
        onError= () => {},
    } = options;

    return useMutation({
        mutationFn,
        onMutate: async (data) => {
            await queryClient.cancelQueries(queryKey);
            const previousData = queryClient.getQueryData(queryKey);
            return { previousData, data };
        },
        onError: (err, data, context) => {
            if (error) showSnackBar(error.title, error.content, error.severity, new Date());

            onError(err, data, context);

            queryClient.setQueryData(queryKey, context.previousData);
        },
        onSuccess: (data, variables, context) => {
            if (success) showSnackBar(success.title, success.content, success.severity, new Date());
            onSuccess(data, variables, context);
        },
        onSettled: () => {
            queryClient.invalidateQueries(queryKey);
        },
    });
};

export default useCustomMutation;

