import React from "react";
import { useTableQuery } from "../../context/TableQueryProvider.jsx";
import { useGetPaginatedUsers } from "../../api/users/useUserFetch.js";
import Typography from "../../components/Typography/Typography.jsx";
import ViewUsersPage from "./pages/ViewUsersPage.jsx";

const UsersMain = () => {
    const {
        page,
        pageSize,
        searchText,
        sortColumn,
        sortDirection,
        updatePagination,
        updateSearchText,
        updateSort,
    } = useTableQuery();

    const { isLoading, error, data } = useGetPaginatedUsers({
        page,
        pageSize,
        searchText,
        sortColumn,
        sortDirection
    });
    return (
        <>
            {error && <Typography>An error has occurred {error}</Typography>}
            {!error && <ViewUsersPage
                data={data}
                isLoading={isLoading}
                paginationModel={{ page, pageSize }}
                onPaginationModelChange={(model) => updatePagination(model.page, model.pageSize)}
                onSearchModelChange={updateSearchText}
                onSortModelChange={updateSort}
            />}
        </>
    );
};
export default UsersMain;
