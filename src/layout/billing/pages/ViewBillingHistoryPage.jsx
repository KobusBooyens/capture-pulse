import React, { useEffect } from "react";
import Box from "../../../components/Box/Box.jsx";
import { CircularProgress, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import ClientDetails from "../../shared/ClientDetails.jsx";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import DeleteDialog from "../../../controls/Dialogs/DeleteDialog.jsx";
import DataTableGrid from "../../../controls/Tables/DataTableGrid/DataTableGrid.jsx";
import useDeleteBilling from "../../../api/billing/useDeleteBilling.js";
import useEditBilling from "../../../api/billing/useEditBilling.js";
import AddEditBillingForm from "../forms/AddEditBillingForm.jsx";
import useBillingHistoryData from "../data/useBillingHistoryData.jsx";
import AddEditBilling from "../dialogs/AddEditBilling.jsx";
import Typography from "../../../components/Typography/Typography.jsx";

const ViewBillingHistoryPage = ({
    data,
    isLoading,
    paginationModel,
    onPaginationModelChange,
    onSearchModelChange,
    onSortModelChange
}) => {
    const editBilling = useEditBilling();
    const deleteBilling = useDeleteBilling();

    const { columns, rows, isActioned, setIsActioned } = useBillingHistoryData(data);
    const methods = useForm();

    const handleCloseDialog = () => {
        setIsActioned({ action: null, data: {} });
    };

    useEffect(() => {
        methods.reset({ ...isActioned.data });
    }, [isActioned.action]);

    useEffect(() => {
        if (!editBilling.isPending && editBilling.isSuccess ||
          !deleteBilling.isPending && deleteBilling.isSuccess) {
            handleCloseDialog();
        }

    }, [editBilling.isPending, editBilling.isSuccess,
        deleteBilling.isPending, deleteBilling.isSuccess]);

    const onFormSubmit = (data) => {
        const dataToSave = {
            ...data,
            amount: data.amount.toString(),
            client: data.client
        };
        editBilling.mutate({ id: data._id, updatedData: dataToSave });
    };

    const fullName = data ?
        <ClientDetails
            name={data.client?.firstName}
            surname={data.client?.lastName}
            contactNumber={data.client?.contactNumber}
        /> : <CircularProgress /> ;

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
                            <Typography variant="subtitle" color="white">Payment History</Typography>
                        </Box>
                        <Box p={3}>
                            <DataTableGrid
                                table={{ columns, rows }}
                                totalRecords={data.recordCount}
                                isDataLoading={isLoading}
                                paginationModel={paginationModel}
                                onPaginationModelChange={onPaginationModelChange}
                                onSearchModelChange={onSearchModelChange}
                                onSortModelChange={onSortModelChange}
                            />
                        </Box>
                    </Card>
                </Grid>
            </Grid>
            <AddEditBilling
                openDialog={isActioned.action === "edit"}
                onClose={handleCloseDialog}
                title={"Edit Payment"}
                fullName={`${data.client?.firstName} ${data.client?.lastName}`}
            >
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onFormSubmit)} noValidate>
                        <AddEditBillingForm isLoading={editBilling.isPending} onCancel={handleCloseDialog}/>
                    </form>
                </FormProvider>
            </AddEditBilling>
            <DeleteDialog
                openDialog={isActioned.action === "delete"}
                onClose={handleCloseDialog}
                onConfirm={() => deleteBilling.mutate({ id: isActioned.data._id })}
                isLoading={deleteBilling.isPending}
            />
        </Box>
    );
};

ViewBillingHistoryPage.propTypes = {
    data: PropTypes.objectOf(PropTypes.array).isRequired,
    isLoading: PropTypes.bool,
    onPaginationModelChange: PropTypes.func,
    onSearchModelChange: PropTypes.func,
    onSortModelChange: PropTypes.func,
    paginationModel: PropTypes.object
};

export default ViewBillingHistoryPage;
