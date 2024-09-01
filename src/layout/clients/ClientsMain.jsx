import React, { useState } from "react";
import Typography from "../../components/Typography/Typography.jsx";
import useClients from "../../api/clients/useClients.js";
import ViewClientsPage from "./pages/ViewClientsPage.jsx";
import DataTableSkeleton from "../../controls/Tables/Skeleton/DataTable.jsx";
import { useTableQuery } from "../../context/table-query-provider.jsx";

const ClientsMain = () => {

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

    const { isLoading, error, data } = useClients({
        page,
        pageSize,
        searchText,
        sortColumn,
        sortDirection
    });

    return (
        <>
            {isLoading && <DataTableSkeleton/>}
            {error && <Typography>An error has occurred {error}</Typography>}
            {data && !error && !isLoading && <ViewClientsPage
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

export default ClientsMain;