import clientQueryKeys from "./useQueryKeys.js";
import useCustomFetch from "../shared/useCustomFetch.js";

const useClients = () => {
    return useCustomFetch(clientQueryKeys.all, "/clients");
};
export default useClients;