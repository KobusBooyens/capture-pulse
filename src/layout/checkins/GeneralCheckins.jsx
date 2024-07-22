import React from "react";
import DataTableSkeleton from "../../controls/Tables/Skeleton/DataTable.jsx";
import Typography from "../../components/Typography/Typography.jsx";
import useClients from "../../api/clients/useClients.js";
import ViewGeneralCheckin from "./pages/ViewGeneralCheckin.jsx";

const GeneralCheckins = () => {
    const { isLoading, error, data } = useClients();
    return (
        <>
            {isLoading && <DataTableSkeleton/>}
            {error && <Typography>An error has occurred {error}</Typography>}
            {data && !error && !isLoading && <ViewGeneralCheckin data={data}/>}
        </>
    );
};
export default GeneralCheckins;
