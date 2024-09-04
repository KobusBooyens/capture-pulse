import React from "react";
import Typography from "../../components/Typography/Typography.jsx";
import { useTableQuery } from "../../context/table-query-provider.jsx";
import useAccounts from "../../api/accounts/useAccounts.jsx";
import DataTableSkeleton from "../../controls/Tables/Skeleton/DataTable.jsx";
import ViewBillingPage from "./pages/ViewBillingPage.jsx";

const BillingMain = () => {
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

    const { isLoading, error, data } = useAccounts(
        page,
        pageSize,
        searchText,
        sortColumn,
        sortDirection
    );

    return (
        <>
            {isLoading && <DataTableSkeleton/>}
            {error && <Typography>An error has occurred {error}</Typography>}
            {data && !error && !isLoading &&
            // <Typography>Welcome to the Billing Page</Typography>
                  <ViewBillingPage
                      data={data}
                      isLoading={isLoading}
                      paginationModel={{ page, pageSize }}
                      onPaginationModelChange={(model) => updatePagination(model.page, model.pageSize)}
                      onSearchModelChange={updateSearchText}
                      onSortModelChange={updateSort}
                  />
            }
        </>
    );
};

export default BillingMain;
