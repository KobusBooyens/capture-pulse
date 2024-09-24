import useQueryKeys from "./useQueryKeys.js";
import { useParams } from "react-router-dom";
import useCustomFetch from "../_shared/useCustomFetch.js";
import userQueryKeys from "./useQueryKeys.js";

const useNotification = () => {
    const { id } = useParams();
    return useCustomFetch(useQueryKeys.detail(id), `notifications/${id}`);
};

const useNotifications = () => {
    return useCustomFetch(userQueryKeys.all, "/notifications");
};

export { useNotification, useNotifications } ;
