import React, { useEffect } from "react";
import Box from "../../../components/Box/Box.jsx";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "../../../components/Typography/Typography.jsx";
import DataTableGrid from "../../../controls/Tables/DataTableGrid/DataTableGrid.jsx";
import { useBillingData } from "../data/useBillingData.jsx";
import PropTypes from "prop-types";
import AddEditBilling from "../dialogs/AddEditBilling.jsx";
import { FormProvider, useForm } from "react-hook-form";
import AddEditBillingForm from "../forms/AddEditBillingForm.jsx";
import useCreateBilling from "../../../api/billing/useCreateBilling.jsx";
import dayjs from "dayjs";

const ViewBillingPage = ({
    data,
    isLoading,
    paginationModel,
    onPaginationModelChange,
    onSearchModelChange,
    onSortModelChange,
}) => {

    const { columns, rows, isAdding, setIsAdding } = useBillingData(data.records);
    const createPayment = useCreateBilling();
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
        const dataToSave = {
            ...data,
            amount: data.amount.toString(),
            client: isAdding.data.client
        };
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
            <AddEditBilling
                openDialog={isAdding.adding}
                onClose={handleCloseDialog}
                title={"Add Payment"}
                fullName={`${isAdding.data?.firstName} ${isAdding.data?.lastName}`}
            >
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onFormSubmit)} noValidate>
                        <AddEditBillingForm isLoading={createPayment.isPending} onCancel={handleCloseDialog}/>
                    </form>
                </FormProvider>
            </AddEditBilling>
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
