import { apiClient } from "../api-client.js";
import queryKeys from "./useQueryKeys.js";
import useCustomMutation from "../_shared/useCustomMutation.js";
import { useAuth } from "../../context/AuthProvider.jsx";

const signInFn = async (payload) => {
    const response = await apiClient.post("/auth/sign-in", payload.data);
    return response.data;
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

export default useAuthSignIn;

