import React from "react";
import { useTableQuery } from "../../context/TableQueryProvider.jsx";
import DataTableSkeleton from "../../controls/Tables/Skeleton/DataTable.jsx";
import Typography from "../../components/Typography/Typography.jsx";
import ViewCheckinHistoryPage from "./pages/ViewCheckinHistoryPage.jsx";
import useCheckin from "../../api/checkins/useCheckin.js";

const CheckinHistoryMain = ({ type }) => {
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

    const { isLoading, error, data } = useCheckin(
        type,
        page,
        pageSize,
        searchText,
        sortColumn,
        sortDirection);

    return (
        <>
            {error && <Typography>An error has occurred {error}</Typography>}
            {!error &&
            <ViewCheckinHistoryPage
                type={type}
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
export default CheckinHistoryMain;
