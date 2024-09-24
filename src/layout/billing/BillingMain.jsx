import React from "react";
import Typography from "../../components/Typography/Typography.jsx";
import { useTableQuery } from "../../context/TableQueryProvider.jsx";
import { useBillings } from "../../api/billing/useBillingFetch.js";
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

    const { isLoading, error, data } = useBillings(
        page,
        pageSize,
        searchText,
        sortColumn,
        sortDirection
    );

    return (
        <>
            {error && <Typography>An error has occurred {error}</Typography>}
            {!error &&
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
