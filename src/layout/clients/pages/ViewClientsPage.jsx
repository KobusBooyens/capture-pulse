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
import ClientDialog from "../dialogs/ClientDialog.jsx";
import BasicInfoForm from "../forms/BasicInfoForm.jsx";
import { FormProvider, useForm } from "react-hook-form";
import MembershipForm from "../forms/MembershipForm.jsx";
import { useEditMembership } from "../../../api/memberships/useMembershipMutation.js";

const ViewClientsPage = ({
    data,
    isLoading,
    paginationModel,
    onPaginationModelChange,
    onSearchModelChange,
    onSortModelChange
}) => {
    const basicInfoMethods = useForm();
    const membershipMethods = useForm();

    const deleteClient = useDeleteClient();
    const createClient = useCreateClient();
    const editClient = useEditClient();

    const editMembership = useEditMembership();

    // const [showBasicInfoDialog, setShowBasicInfoDialog] = useState(false);
    const [selectedAction, setSelectedAction] = useState({
        action: null,
        show: false,
        data: {},
        clientId: null
    });

    const { columns, rows, cardItemsContent } = useClientTableData(data?.records, selectedAction, setSelectedAction);

    useEffect(() => {
        basicInfoMethods.reset(selectedAction.action === "edit" ?
            { ...selectedAction.data } : {});

        membershipMethods.reset(selectedAction.action === "membership" ?
            { ...selectedAction.data } : {});

    }, [selectedAction.action, selectedAction.data]);

    const handleActionCloseEvents = () => {
        basicInfoMethods.reset({});
        membershipMethods.reset({});
        setSelectedAction({ action: null, show: false, data: {}, clientId: null });
    };

    // const handleCloseBasicInfoDialog = () => {
    //     setShowBasicInfoDialog(false);
    //     setIsEditing({ show: false, data: {}, clientId: null });
    //     methods.reset({});
    // };
    //
    // const handleCloseDeleteDialog = () => {
    //     setIsDeleting({ deleting: false, data: {} });
    // };
    //
    // const handleCloseViewNotes = () => {
    //     setViewNotes({ show: false, data: [], clientId: null });
    // };

    const handleCreateClient = () => {
        setSelectedAction({ action: "create", show: true, clientId: null, data: {} });
    };

    const onFormSubmitMembership = (data) => {
        const dataToSubmit = {
            package: data.package,
            amount: data.amount,
            height: data.height,
            weight: data.weight,
            joiningDate: data.joiningDate,
            paymentDay: data.paymentDay,
            goal: data.goal,
            client: data._id
        };

        console.log("onFormSubmitMembership", dataToSubmit);

        editMembership.mutate({
            id: data?.membership,
            updatedData: { ...dataToSubmit }
        }, {
            onSuccess: () => {
                handleActionCloseEvents();
            } });
    };

    const onFormSubmitBasicInfo = (data) => {
        if (selectedAction.action === "create") {
            createClient.mutate({ ...data }, {
                onSuccess: () => {
                    handleActionCloseEvents();
                } });
        } else if (selectedAction.action === "edit" && selectedAction.show) {
            editClient.mutate({
                id: selectedAction.clientId,
                updatedData: { ...data }
            }, {
                onSuccess: () => {
                    handleActionCloseEvents();
                } });
        }
    };

    const handleDelete = () => {
        deleteClient.mutate({ id: selectedAction.data._id }, {
            onSuccess: () => {
                // setIsDeleting({ deleting: false, data: {} });
                handleActionCloseEvents();
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
                                onClick={handleCreateClient}
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

            <ClientDialog
                openDialog={(selectedAction.action === "create" || selectedAction.action === "edit")
                  && selectedAction.show}
                onClose={handleActionCloseEvents}
                isLoading={false}
                icon={"people_alt"}
                title={selectedAction.action === "edit" ? "Edit Client" : "Add Client"}
            >
                <FormProvider {...basicInfoMethods}>
                    <form onSubmit={basicInfoMethods.handleSubmit(onFormSubmitBasicInfo)} noValidate>
                        <BasicInfoForm
                            isLoading={createClient.isPending || editClient.isPending}
                            onCancel={handleActionCloseEvents}/>
                    </form>
                </FormProvider>
            </ClientDialog>

            <ClientDialog
                openDialog={selectedAction.action === "membership"
                && selectedAction.show}
                onClose={handleActionCloseEvents}
                isLoading={false}
                icon={"card_membership"}
                title={"Manage Membership"}
            >
                <FormProvider {...membershipMethods}>
                    <form onSubmit={membershipMethods.handleSubmit(onFormSubmitMembership)} noValidate>
                        <MembershipForm
                            isLoading={editMembership.isPending}
                            onCancel={handleActionCloseEvents}/>
                    </form>
                </FormProvider>
            </ClientDialog>

            <DeleteDialog
                openDialog={selectedAction.action === "delete" && selectedAction.show}
                onClose={handleActionCloseEvents}
                onConfirm={handleDelete}
                isLoading={deleteClient.isPending}
                contentTextValue={"Are you sure you want to remove this client?"}
            />
            <NotesDialog
                openDialog={selectedAction.action === "notes" && selectedAction.show}
                onClose={handleActionCloseEvents}
                data={selectedAction.data}
                clientId={selectedAction.clientId}
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
