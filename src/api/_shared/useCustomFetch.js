import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api-client.js";

const useCustomFetch = (queryKey, url, options = {}) => {
    const fetchFn = async () => {
        const response = await apiClient.get(url);
        return response.data;
    };

    return useQuery({
        queryKey,
        queryFn: fetchFn,
        ...options,
    });
};

export default useCustomFetch;
