import React from "react";
import DataTableSkeleton from "../../controls/Tables/Skeleton/DataTable.jsx";
import Typography from "../../components/Typography/Typography.jsx";
import useClients from "../../api/clients/useClients.js";
import ViewWeighingCheckinPage from "./pages/ViewWeighingCheckinPage.jsx";

const WeighingCheckinsMain = () => {
    const { isLoading, error, data } = useClients();
    return (
        <>
            {isLoading && <DataTableSkeleton/>}
            {error && <Typography>An error has occurred {error}</Typography>}
            {data && !error && !isLoading && <ViewWeighingCheckinPage data={data}/>}
        </>
    );
};
export default WeighingCheckinsMain;
