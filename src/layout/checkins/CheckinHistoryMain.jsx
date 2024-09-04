import React from "react";
import { useTableQuery } from "../../context/table-query-provider.jsx";
import useCheckins from "../../api/checkins/useCheckins.js";
import DataTableSkeleton from "../../controls/Tables/Skeleton/DataTable.jsx";
import Typography from "../../components/Typography/Typography.jsx";
import ViewCheckinHistoryPage from "./pages/ViewCheckinHistoryPage.jsx";

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

    const { isLoading, error, data } = useCheckins(
        type,
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
