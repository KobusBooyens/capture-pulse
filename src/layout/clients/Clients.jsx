import React from "react";
import DashboardLayout from "../../controls/LayoutContainers/DashboardLayout.jsx";
import DashboardNavbar from "../../controls/Navbars/DashboardNavbar/DashboardNavbar.jsx";
import Footer from "../../controls/Footer/Footer.jsx";
import Typography from "../../components/Typography/Typography.jsx";
import useClients from "../../api/clients/useClients.js";
import ViewClients from "./ViewClients.jsx";
import DataTableSkeleton from "../../controls/Tables/Skeleton/DataTable.jsx";

const Clients = () => {
    const { isLoading, error, data } = useClients();

    return (
        <DashboardLayout>
            <DashboardNavbar/>
            {isLoading && <DataTableSkeleton/>}
            {error && <Typography>An error has occurred {error}</Typography>}
            {data && !error && !isLoading && <ViewClients data={data}/>}
            <Footer />
        </DashboardLayout>
    );
};
export default Clients;
