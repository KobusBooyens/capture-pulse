import React from "react";
import tableData from "./data/clientsTableData.jsx";
import Box from "../../components/Box/Box.jsx";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "../../components/Typography/Typography.jsx";
import DataTable from "../../controls/Tables/DataTable/DataTable.jsx";
import Button from "../../components/Button/Button.jsx";
import Icon from "@mui/material/Icon";

const ViewClients = ({ data }) => {
    const { columns, rows } = tableData(data);

    return (
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
                            className={"flex flex-row justify-between"}
                        >
                            <Typography variant="h5" color="white">Clients</Typography>
                            <Button color={"white"} className={"flex gap-2"}> <Icon>add</Icon> Add Client</Button>
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
    );
};
export default ViewClients;
