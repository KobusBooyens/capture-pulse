import React, { useCallback, useEffect } from "react";
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
import { useCreateBilling } from "../../../api/billing/useCreateBillingMutation.js";
import dayjs from "dayjs";
import billingStatus from "../../../data/billingStatus.jsx";
import Tooltip from "@mui/material/Tooltip";

const TableHeader = () => <Box display={"flex"} justifyContent="flex-end" gap={1}>
    <Tooltip placement={"top"} title={"Account is up to date"} arrow={false}>
        {billingStatus.statusChips["0"]}
    </Tooltip>
    <Tooltip placement={"top"} title={"Have not received a payment in the last 15 days"} arrow={false}>
        {billingStatus.statusChips["1"]}
    </Tooltip>
    <Tooltip placement={"top"} title={"Have not received a payment in the last 30 days"} arrow={false}>
        {billingStatus.statusChips["2"]}
    </Tooltip>
    <Tooltip placement={"top"} title={"Pending first payment"} arrow={false}>
        {billingStatus.statusChips["3"]}
    </Tooltip>
</Box>;

const ViewBillingPage = ({
    data,
    isLoading,
    paginationModel,
    onPaginationModelChange,
    onSearchModelChange,
    onSortModelChange,
}) => {

    const { columns, rows, isAdding, setIsAdding } = useBillingData(data?.records);
    const createPayment = useCreateBilling();
    const methods = useForm();

    const handleCloseDialog = useCallback(() => {
        setIsAdding({ adding: false, data: {} });
        methods.reset({});
    });

    useEffect(() => {
        methods.reset({
            date: dayjs(),
            amount: isAdding.data.amount
        });
    },[isAdding.data, methods]);

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
                                TableHeaderComponent={TableHeader}
                                totalRecords={data?.recordCount}
                                isDataLoading={isLoading}
                                paginationModel={paginationModel}
                                searchModel={{ enabled: true, placeholder: "Search client", label:"Search" }}
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
