import React, { useEffect, useState } from "react";
import useClientTableData from "../data/useClientData.jsx";
import Box from "../../../components/Box/Box.jsx";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "../../../components/Typography/Typography.jsx";
import Button from "../../../components/Button/Button.jsx";
import Icon from "@mui/material/Icon";
import PropTypes from "prop-types";
import DeleteDialog from "../../../controls/Dialogs/DeleteDialog.jsx";
import { useCreateClient, useDeleteClient, useEditClient } from "../../../api/clients/useClientMutation.js";
import NotesDialog from "../../../controls/Dialogs/NotesDialog/NotesDialog.jsx";
import DataTableView from "../../../controls/Tables/DataTableView/DataTableView.jsx";
import ClientBasicInfoDialog from "../dialogs/ClientBasicInfoDialog.jsx";
import BasicInfoForm from "../forms/BasicInfoForm.jsx";
import { FormProvider, useForm } from "react-hook-form";

const ViewClientsPage = ({
    data,
    isLoading,
    paginationModel,
    onPaginationModelChange,
    onSearchModelChange,
    onSortModelChange
}) => {
    const methods = useForm();
    const deleteClient = useDeleteClient();
    const createClient = useCreateClient();
    const editClient = useEditClient();
    const [showBasicInfoDialog, setShowBasicInfoDialog] = useState(false);
    
    const { columns, rows, cardItemsContent,
        isDeleting, setIsDeleting,
        isEditing, setIsEditing,
        viewNotes, setViewNotes } =
      useClientTableData(data?.records);

    useEffect(() => {
        methods.reset({ ...isEditing.data });
    }, [isEditing.data]);
    
    const handleCloseBasicInfoDialog = () => {
        setShowBasicInfoDialog(false);
        setIsEditing({ show: false, data: {}, clientId: null });
        methods.reset({});
    };

    const handleCloseDeleteDialog = () => {
        setIsDeleting({ deleting: false, data: {} });
    };

    const handleCloseViewNotes = () => {
        setViewNotes({ show: false, data: [], clientId: null });
    };

    const onFormSubmit = (data) => {
        if (showBasicInfoDialog) {
            createClient.mutate({ ...data }, {
                onSuccess: () => {
                    handleCloseBasicInfoDialog();
                } });
        } else if (isEditing.show) {
            editClient.mutate({
                id: isEditing.clientId,
                updatedData: {
                    ...data
                }
            }, {
                onSuccess: () => {
                    handleCloseBasicInfoDialog();
                } });
        }
    };

    const handleDelete = () => {
        deleteClient.mutate({ id: isDeleting.data._id }, {
            onSuccess: () => {
                setIsDeleting({ deleting: false, data: {} });
            }
        });
    };

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
                                    setShowBasicInfoDialog(true)
                                    // navigate("add")
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

            <ClientBasicInfoDialog
                openDialog={showBasicInfoDialog || isEditing.show}
                onClose={handleCloseBasicInfoDialog}
                isLoading={false}
                title={isEditing.show ? "Edit Client" : "Add Client"}
            >
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onFormSubmit)} noValidate>
                        <BasicInfoForm
                            isLoading={createClient.isPending || editClient.isPending}
                            onCancel={handleCloseBasicInfoDialog}/>
                    </form>
                </FormProvider>
            </ClientBasicInfoDialog>
            <DeleteDialog
                openDialog={isDeleting.deleting}
                onClose={handleCloseDeleteDialog}
                onConfirm={handleDelete}
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
