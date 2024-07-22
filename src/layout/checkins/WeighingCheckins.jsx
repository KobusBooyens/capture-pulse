import React from "react";
import DataTableSkeleton from "../../controls/Tables/Skeleton/DataTable.jsx";
import Typography from "../../components/Typography/Typography.jsx";
import useClients from "../../api/clients/useClients.js";
import ViewWeighingCheckin from "./pages/ViewWeighingCheckin.jsx";

const WeighingCheckins = () => {
    const { isLoading, error, data } = useClients();
    return (
        <>
            {isLoading && <DataTableSkeleton/>}
            {error && <Typography>An error has occurred {error}</Typography>}
            {data && !error && !isLoading && <ViewWeighingCheckin data={data}/>}
        </>
    );
};
export default WeighingCheckins;
