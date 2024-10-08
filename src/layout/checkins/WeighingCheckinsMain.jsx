import React from "react";
import Typography from "../../components/Typography/Typography.jsx";
import ViewWeighingCheckinPage from "./pages/ViewWeighingCheckinPage.jsx";
import { useTableQuery } from "../../context/TableQueryProvider.jsx";
import { useCheckins } from "../../api/checkins/useCheckinFetch.js";

const WeighingCheckinsMain = () => {
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
        "weighing",
        page,
        pageSize,
        searchText,
        sortColumn,
        sortDirection
    );

    return (
        <>
            {/*{isLoading && <DataTableSkeleton/>}*/}
            {error && <Typography>An error has occurred {error}</Typography>}
            {!error &&
              <ViewWeighingCheckinPage
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
export default WeighingCheckinsMain;
