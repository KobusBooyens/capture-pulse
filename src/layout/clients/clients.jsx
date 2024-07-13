import React from "react";
import DashboardLayout from "../../controls/LayoutContainers/DashboardLayout.jsx";
import DashboardNavbar from "../../controls/Navbars/DashboardNavbar/DashboardNavbar.jsx";
import Footer from "../../controls/Footer/Footer.jsx";
import Box from "../../components/Box/Box.jsx";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "../../components/Typography/Typography.jsx";
import DataTable from "../../controls/Tables/DataTable/DataTable.jsx";
import tableData from "./data/clientsTableData.jsx";

const Clients = () => {
    const { columns, rows } = tableData();

    console.log({ columns, rows });

    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <Box pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <Box
                                mx={2}
                                mt={-3}
                                py={3}
                                px={2}
                                variant="gradient"
                                bgColor="info"
                                borderRadius="lg"
                                coloredShadow="info"
                            >
                                <Typography variant="h6" color="white">
                        Clients
                                </Typography>
                            </Box>
                            <Box pt={3}>
                                <DataTable
                                    table={{ columns, rows }}
                                    entriesPerPage={10}
                                    canSearch={true}
                                    noEndBorder
                                    isSorted={true}
                                    showTotalEntries={true}
                                />
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
            <Footer />
        </DashboardLayout>
    );
};
export default Clients;
