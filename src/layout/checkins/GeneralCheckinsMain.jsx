import React from "react";
import DataTableSkeleton from "../../controls/Tables/Skeleton/DataTable.jsx";
import Typography from "../../components/Typography/Typography.jsx";
import ViewGeneralCheckinPage from "./pages/ViewGeneralCheckinPage.jsx";
import { useTableQuery } from "../../context/table-query-provider.jsx";
import useCheckins from "../../api/checkins/useCheckins.js";

const GeneralCheckinsMain = () => {
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
        "general",
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
              <ViewGeneralCheckinPage
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
export default GeneralCheckinsMain;
