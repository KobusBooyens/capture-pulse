import axios from "axios";

export const apiClient = axios.create({
    baseURL: "http://localhost:5001/api/",
    headers: {
        Authorization: `Bearer: ${localStorage.getItem("authToken")}`
    }
});

export const buildUrlParams = (page, pageSize, searchText, sortColumn, sortDirection) => {
    const params = new URLSearchParams({ page: page + 1, pageSize });
    if (searchText) { params.set("searchText", searchText); }
    if (sortColumn) { params.set("sortColumn", sortColumn); }
    if (sortDirection) { params.set("sortDirection", sortDirection); }

    return params.toString();
};