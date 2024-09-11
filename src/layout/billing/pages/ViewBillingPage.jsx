import React, { useEffect } from "react";
import Box from "../../../components/Box/Box.jsx";
import { CircularProgress, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "../../../components/Typography/Typography.jsx";
import DataTableGrid from "../../../controls/Tables/DataTableGrid/DataTableGrid.jsx";
// import AddEditCheckin from "../../checkins/dialogs/AddEditCheckin.jsx";
// import { FormProvider } from "react-hook-form";
// import AddEditGeneralCheckinForm from "../../checkins/forms/AddEditGeneralCheckinForm.jsx";
// import AddEditWeighingCheckinForm from "../../checkins/forms/AddEditWeighingCheckinForm.jsx";
// import DeleteDialog from "../../../controls/Dialogs/DeleteDialog.jsx";
import { useBillingData } from "../data/useBillingData.jsx";
import PropTypes from "prop-types";
import AddEditPayment from "../dialogs/AddEditPayment.jsx";
import { FormProvider, useForm } from "react-hook-form";
import AddEditPaymentForm from "../forms/AddEditPaymentForm.jsx";
import useCreateAccount from "../../../api/accounts/useCreateAccount.jsx";
import dayjs from "dayjs";

const ViewBillingPage = ({
    data,
    isLoading,
    paginationModel,
    onPaginationModelChange,
    onSearchModelChange,
    onSortModelChange,
},
) => {

    const { columns, rows, isAdding, setIsAdding } = useBillingData(data.records);
    const createPayment = useCreateAccount();
    const methods = useForm();

    const handleCloseDialog = () => {
        setIsAdding({ adding: false, data: {} });
        methods.reset({});
    };

    useEffect(() => {
        methods.reset({
            date: dayjs(),
            amount: isAdding.data.amount
        });
    },[isAdding.data]);

    useEffect(() => {
        if (!createPayment.isPending && createPayment.isSuccess) {
            handleCloseDialog();
        }

    }, [createPayment.isPending, createPayment.isSuccess]);

    const onFormSubmit = (data) => {
        console.log("onFormSubmit", isAdding.data);
        const dataToSave = {
            ...data,
            client: isAdding.data.client
        };
        console.log("dataToSave", dataToSave);
        createPayment.mutate({ data: dataToSave });
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
                            <Typography variant="subtitle" color="white">Payments</Typography>
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
            <AddEditPayment
                openDialog={isAdding.adding}
                onClose={handleCloseDialog}
                title={"Add Payment"}
                fullName={`${isAdding.data?.firstName} ${isAdding.data?.lastName}`}
            >
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onFormSubmit)} noValidate>
                        <AddEditPaymentForm isLoading={createPayment.isPending} onCancel={handleCloseDialog}/>
                    </form>
                </FormProvider>
            </AddEditPayment>
            {/*<DeleteDialog*/}
            {/*  openDialog={isActioned.action === "delete"}*/}
            {/*  onClose={handleCloseDialog}*/}
            {/*  onConfirm={() => deleteCheckin.mutate({ id: isActioned.data._id, type })}*/}
            {/*  isLoading={deleteCheckin.isPending}*/}
            {/*/>*/}
        </Box>
    );
};

ViewBillingPage.propTypes = {
    data: PropTypes.objectOf(PropTypes.array).isRequired,
    isLoading: PropTypes.bool,
    onPaginationModelChange: PropTypes.func,
    onSearchModelChange: PropTypes.func,
    onSortModelChange: PropTypes.func,
    paginationModel: PropTypes.object
};
export default ViewBillingPage;
