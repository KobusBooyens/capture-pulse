import React, { useCallback, useEffect, useState } from "react";
import useClientTableData from "../data/useClientDataTable.jsx";
import Box from "../../../components/Box/Box.jsx";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "../../../components/Typography/Typography.jsx";
import DataTable from "../../../controls/Tables/DataTable/DataTable.jsx";
import Button from "../../../components/Button/Button.jsx";
import Icon from "@mui/material/Icon";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "../../../controls/Dialogs/DeleteDialog.jsx";
import useDeleteClient from "../../../api/clients/useDeleteClient.js";

const ViewClientsPage = ({ data }) => {
    const navigate = useNavigate();
    const deleteClient = useDeleteClient();

    const { columns, rows, isDeleting, setIsDeleting } = useClientTableData(data);

    const handleCloseDeleteDialog = () => {
        setIsDeleting({ deleting: false, data: {} });
    };

    useEffect(() => {
        if (deleteClient.isSuccess) {
            setIsDeleting({ deleting: false, data: {} });
        }
    }, [deleteClient.isSuccess]);

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
            <DeleteDialog
                openDialog={isDeleting.deleting}
                onClose={handleCloseDeleteDialog}
                onConfirm={() => deleteClient.mutate({ id: isDeleting.data._id })}
                isLoading={deleteClient.isPending}
            />
        </Box>
    );
};

ViewClientsPage.propTypes = {
    data: PropTypes.objectOf(PropTypes.array).isRequired
};

export default ViewClientsPage;
