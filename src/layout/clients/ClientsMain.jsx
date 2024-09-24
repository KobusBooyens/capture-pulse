import React, { useState } from "react";
import Typography from "../../components/Typography/Typography.jsx";
import { useClients } from "../../api/clients/useClientMutation.js";
import ViewClientsPage from "./pages/ViewClientsPage.jsx";

import { useTableQuery } from "../../context/TableQueryProvider.jsx";

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
            {/*{isLoading && <DataTableSkeleton/>}*/}
            {error && <Typography>An error has occurred {error}</Typography>}
            {!error && <ViewClientsPage
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