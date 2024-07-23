import React from "react";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import Box from "../../../components/Box/Box.jsx";
import Typography from "../../../components/Typography/Typography.jsx";
import DataTable from "../../../controls/Tables/DataTable/DataTable.jsx";
import PropTypes from "prop-types";
import { useWeighingCheckinData } from "../data/useWeighingCheckinData.jsx";

const ViewWeighingCheckinPage = ({ data }) => {
    const { columns, rows } = useWeighingCheckinData(data);
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
                            <Typography variant="h5" color="white">Clients Weighing Check-in</Typography>
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

ViewWeighingCheckinPage.propTypes = {
    data: PropTypes.objectOf(PropTypes.array).isRequired
};

export default ViewWeighingCheckinPage;
