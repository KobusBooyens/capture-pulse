import React, { useEffect, useState } from "react";
import useUsersData from "../data/useUsersData.jsx";
import { CircularProgress, DialogActions, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import Box from "../../../components/Box/Box.jsx";
import Typography from "../../../components/Typography/Typography.jsx";
import Button from "../../../components/Button/Button.jsx";
import Icon from "@mui/material/Icon";
import DataTableGrid from "../../../controls/Tables/DataTableGrid/DataTableGrid.jsx";
import AddEditUserDialog from "../dialogs/AddEditUserDialog.jsx";
import { FormProvider, useForm } from "react-hook-form";
import UserForm from "../forms/UserForm.jsx";
import DeleteDialog from "../../../controls/Dialogs/DeleteDialog.jsx";
import useDeleteUser from "../../../api/users/useDeleteUser.js";
import { useCreateUser, useUpdateUser } from "../../../api/users/useCreateUser.js";
import { useAuth } from "../../../context/AuthProvider.jsx";

const ViewUsersPage = ({
    data,
    isLoading,
    paginationModel,
    onPaginationModelChange,
    onSearchModelChange,
    onSortModelChange
}) => {
    const { columns, rows, handleAction, setHandleAction } = useUsersData(data?.records);
    const [addingUser, setIAddingUser] = useState(false);
    const { currentUser } = useAuth();
    const deleteUser = useDeleteUser();
    const createUser = useCreateUser(true, true);
    const updateUser = useUpdateUser();
    const methods = useForm();
    
    const [showAddEditUserDialog, setShowAddEditUserDialog] = useState({
        title: "",
        show: false,
        isLoading: false
    });

    useEffect(() => {

        console.log(handleAction.data);
        methods.reset({
            ...handleAction.data,
            subscriptionCode: currentUser.subscription._id });
    }, [handleAction.action, addingUser]);

    useEffect(() => {
        if (addingUser) {
            setShowAddEditUserDialog({
                title: "Add User",
                show: true,
                isLoading: createUser.isPending,
            });
        } else if (handleAction.action === "edit") {
            setShowAddEditUserDialog({
                title: "Edit User",
                show: true,
                isLoading: updateUser.isPending,
            });
        } else {
            setShowAddEditUserDialog({ title: "", show: false, isLoading: false });
        }
    }, [addingUser, handleAction.action, createUser.isPending, updateUser.isPending]);

    const handleCloseDeleteDialog = () => setHandleAction({ action: null, data: {} });
    const handleAddUser = () => setIAddingUser(true);

    const handleCloseAddEditUserDialog = () => {
        setIAddingUser(false);
        setHandleAction({ action: null, data: {} });
    };

    const onFormSubmit = (data) => {
        if (addingUser) {
            createUser.mutate(data, {
                onSuccess: () => {
                    setIAddingUser(false);
                }
            });
        } else if (handleAction.action === "edit") {
            updateUser.mutate({ id: data._id, updatedData: data }, {
                onSuccess: () => {
                    setHandleAction({ action: null, data: {} });
                }
            });
        }

    };

    const onDeleteUser = () => {
        deleteUser.mutate({ id: handleAction.data._id }, {
            onSuccess: () => {
                handleCloseDeleteDialog();
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
                            <Typography variant="subtitle" color="white">Users</Typography>
                            <Button variant={"gradient"}
                                color={"secondary"}
                                className={"flex gap-2"}
                                onClick={handleAddUser}
                            >
                                <Icon>add</Icon> Add User
                            </Button>
                        </Box>
                        <Box p={3}>
                            <DataTableGrid
                                table={{ columns, rows }}
                                totalRecords={data?.recordCount}
                                isDataLoading={isLoading}
                                paginationModel={paginationModel}
                                onPaginationModelChange={onPaginationModelChange}
                                searchModel={{ enabled: true, placeholder: "Search user", label:"Search" }}
                                onSearchModelChange={onSearchModelChange}
                                onSortModelChange={onSortModelChange}
                            />
                        </Box>
                    </Card>
                </Grid>
            </Grid>

            <AddEditUserDialog
                openDialog={showAddEditUserDialog.show}
                title={showAddEditUserDialog.title}
                onClose={handleCloseAddEditUserDialog}
            >
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onFormSubmit)} noValidate>
                        <UserForm
                            onCancel={handleCloseAddEditUserDialog}
                            isLoading={showAddEditUserDialog.isLoading}
                            adding={addingUser}
                        />
                    </form>
                </FormProvider>
            </AddEditUserDialog>
            <DeleteDialog
                openDialog={handleAction.action === "delete"}
                onClose={handleCloseDeleteDialog}
                onConfirm={onDeleteUser}
                isLoading={deleteUser.isPending}
            />
        </Box>
    );
};
export default ViewUsersPage;
