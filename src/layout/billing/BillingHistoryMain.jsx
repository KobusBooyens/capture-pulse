import React from "react";
import { useTableQuery } from "../../context/table-query-provider.jsx";
import useBilling from "../../api/billing/useBilling.js";
import DataTableSkeleton from "../../controls/Tables/Skeleton/DataTable.jsx";
import Typography from "../../components/Typography/Typography.jsx";
import ViewBillingHistoryPage from "./pages/ViewBillingHistoryPage.jsx";

const BillingHistoryMain = () => {
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

    const { isLoading, error, data } = useBilling(
        page,
        pageSize,
        searchText,
        sortColumn,
        sortDirection);

    return (
        <>
            {isLoading && <DataTableSkeleton/>}
            {error && <Typography>An error has occurred {error}</Typography>}
            {data && !error && !isLoading &&
              <ViewBillingHistoryPage
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
export default BillingHistoryMain;
