import React, { useState } from "react";
import tableData from "../data/ViewClientsDataTable.jsx";
import Box from "../../../components/Box/Box.jsx";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "../../../components/Typography/Typography.jsx";
import DataTable from "../../../controls/Tables/DataTable/DataTable.jsx";
import Button from "../../../components/Button/Button.jsx";
import Icon from "@mui/material/Icon";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import SnackbarAlert from "../../../components/Snackbar/SnackbarAlert.jsx";

const ViewClientsPage = ({ data }) => {
    const navigate = useNavigate();
    const { columns, rows } = tableData(data);

    const [successSB, setSuccessSB] = useState(false);
    const openSuccessSB = () => setSuccessSB(true);
    const closeSuccessSB = () => setSuccessSB(false);
    const renderSuccessSB = 
      <SnackbarAlert
          color="success"
          icon="check"
          title="Material Dashboard"
          content="Hello, world! This is a notification message"
          dateTime="11 mins ago"
          open={successSB}
          onClose={closeSuccessSB}
          close={closeSuccessSB}
          bgWhite
      />
    ;

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
                            <Button variant={"gradient"}
                                color={"secondary"}
                                className={"flex gap-2"}
                                onClick={() =>
                                    // openSuccessSB(true)
                                    navigate("add")
                                }
                            >
                                <Icon>add</Icon> Add Client
                            </Button>
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
            {renderSuccessSB}
        </Box>
    );
};

ViewClientsPage.propTypes = {
    data: PropTypes.objectOf(PropTypes.array).isRequired
};

export default ViewClientsPage;
