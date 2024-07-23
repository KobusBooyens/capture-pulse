import React, { useMemo } from "react";
import Box from "../../../components/Box/Box.jsx";
import { CircularProgress, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "../../../components/Typography/Typography.jsx";
import ClientDetails from "../../shared/ClientDetails.jsx";
import PropTypes from "prop-types";
import useCheckins from "../../../api/checkins/useCheckins.js";
import { useCheckinHistoryData } from "../data/useCheckinHistoryData.jsx";
import DataTable from "../../../controls/Tables/DataTable/DataTable.jsx";
import DataTableSkeleton from "../../../controls/Tables/Skeleton/DataTable.jsx";

const ViewCheckinHistoryPage = ({ type }) => {

    const { isLoading, data } = useCheckins(type);

    const { columns, rows } = useCheckinHistoryData(type, data?.records);

    const fullName = useMemo(() => {
        return data ? 
            <ClientDetails
                name={data.client?.firstName}
                surname={data.client?.lastName}
                contactNumber={data.client?.contactNumber}
            />
            : 
            <CircularProgress />
        ;
    }, [data]);
    
    const dataTable = useMemo(() => {
        return data ? 
            <DataTable
                table={{ columns, rows }}
                entriesPerPage={10}
                canSearch={true}
                noEndBorder
                isSorted={true}
                showTotalEntries={true}
            />
            : 
            <DataTableSkeleton />
        ;
    }, [data, columns, rows]);

    if (isLoading) {
        return <CircularProgress />;
    }
    
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
                            bgColor="primary"
                            borderRadius="lg"
                            coloredShadow="dark"
                            className={"flex flex-row justify-between"}
                        >
                            {fullName}
                            <Typography variant="h5" color="white">
                                View {type} Check-ins
                            </Typography>
                        </Box>
                        <Box pt={3}>
                            {dataTable}
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

ViewCheckinHistoryPage.propTypes = {
    type: PropTypes.oneOf(["General", "Weighing"])
};

export default ViewCheckinHistoryPage;
