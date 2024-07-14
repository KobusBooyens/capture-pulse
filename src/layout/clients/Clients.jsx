import React from "react";
import Typography from "../../components/Typography/Typography.jsx";
import useClients from "../../api/clients/useClients.js";
import ViewClientsPage from "./pages/ViewClientsPage.jsx";
import DataTableSkeleton from "../../controls/Tables/Skeleton/DataTable.jsx";

const Clients = () => {
    const { isLoading, error, data } = useClients();
    return (
        <>
            {isLoading && <DataTableSkeleton/>}
            {error && <Typography>An error has occurred {error}</Typography>}
            {data && !error && !isLoading && <ViewClientsPage data={data}/>}
        </>

    );
};
export default Clients;
