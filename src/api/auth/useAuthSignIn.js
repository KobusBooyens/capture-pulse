import { apiClient } from "../api-client.js";
import queryKeys from "./useQueryKeys.js";
import useCustomMutation from "../_shared/useCustomMutation.js";

const signInFn = async (payload) => {
    console.log(payload.data);
    const response = await apiClient.post("/auth/sign-in", payload.data);

    response.data?.authToken && localStorage.setItem("authToken", response.data.authToken);
    response.data?.user && localStorage.setItem("user", JSON.stringify(response.data.user));

    return response.data;
};

const useAuthSignIn = () => {
    return useCustomMutation(signInFn, queryKeys.DETAIL, );
};

export default useAuthSignIn;

