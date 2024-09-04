import React, { useCallback, useEffect, useState } from "react";
import useClientTableData from "../data/useClientData.jsx";
import Box from "../../../components/Box/Box.jsx";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "../../../components/Typography/Typography.jsx";
import Button from "../../../components/Button/Button.jsx";
import Icon from "@mui/material/Icon";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "../../../controls/Dialogs/DeleteDialog.jsx";
import useDeleteClient from "../../../api/clients/useDeleteClient.js";
import DataTableGrid from "../../../controls/Tables/DataTableGrid/DataTableGrid.jsx";

const ViewClientsPage = ({
    data,
    isLoading,
    paginationModel,
    onPaginationModelChange,
    onSearchModelChange,
    onSortModelChange
}) => {
    const navigate = useNavigate();
    const deleteClient = useDeleteClient();

    const { columns, rows, isDeleting, setIsDeleting } = useClientTableData(data.records);

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
                            bgColor="primary"
                            borderRadius="lg"
                            coloredShadow="dark"
                            className={"flex flex-row justify-between"}
                        >
                            <Typography variant="subtitle" color="white">Clients</Typography>
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
                        <Box p={3}>
                            <DataTableGrid
                                table={{ columns, rows }}
                                totalRecords={data.recordCount}
                                isDataLoading={isLoading}
                                paginationModel={paginationModel}
                                onPaginationModelChange={onPaginationModelChange}
                                searchModel={{ enabled: true, placeholder: "Search client", label:"Search" }}
                                onSearchModelChange={onSearchModelChange}
                                onSortModelChange={onSortModelChange}
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
    data: PropTypes.objectOf(PropTypes.array).isRequired,
    isLoading: PropTypes.bool,
    onPaginationModelChange: PropTypes.func,
    onSearchModelChange: PropTypes.func,
    onSortModelChange: PropTypes.func,
    paginationModel: PropTypes.object
};

export default ViewClientsPage;
