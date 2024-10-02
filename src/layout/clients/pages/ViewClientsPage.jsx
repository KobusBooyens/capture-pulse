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
import { useDeleteClient } from "../../../api/clients/useClientMutation.js";
import NotesDialog from "../../../controls/Dialogs/NotesDialog/NotesDialog.jsx";
import DataTableView from "../../../controls/Tables/DataTableView/DataTableView.jsx";

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
    const { columns, rows, cardItemsContent, isDeleting, setIsDeleting, viewNotes, setViewNotes } =
      useClientTableData(data?.records);

    const handleCloseDeleteDialog = () => {
        setIsDeleting({ deleting: false, data: {} });
    };

    const handleCloseViewNotes = () => {
        setViewNotes({ show: false, data: [], clientId: null });
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
                            <DataTableView
                                rowsView={{ rows, columns }}
                                gridView={cardItemsContent()}
                                totalRecords={data?.recordCount}
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
                contentTextValue={"Are you sure you want to remove this client?"}
            />
            <NotesDialog
                openDialog={viewNotes.show}
                onClose={handleCloseViewNotes}
                data={viewNotes.data}
                clientId={viewNotes.clientId}
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
