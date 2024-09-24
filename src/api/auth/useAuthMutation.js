import { apiClient } from "../api-client.js";
import queryKeys from "./useQueryKeys.js";
import useCustomMutation from "../_shared/useCustomMutation.js";
import { useAuth } from "../../context/AuthProvider.jsx";

const signInFn = async (payload) => {
    const response = await apiClient.post("/auth/sign-in", payload.data);
    return response.data;
};

const signOutFn = async (id) => {
    const response = await apiClient.get(`/auth/sign-out/${id}`);
    return response.data;
};

const useAuthSignOut = () => {
    const { handleSignOut } = useAuth();
    return useCustomMutation(signOutFn, queryKeys.DETAIL, {
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while trying to sign-out. Please try again!",
            severity: "error"
        },
    }, {
        onSuccess: () => handleSignOut()
    } );
};

const useAuthSignIn = () => {
    const { handleSignIn } = useAuth();
    return useCustomMutation(signInFn, queryKeys.DETAIL, { }, {
        onSuccess: ( data) => {
            if (data.authToken && data.user) {
                handleSignIn(data.authToken, data.user);
            }
        }
    } );
};

export { useAuthSignIn, useAuthSignOut };

