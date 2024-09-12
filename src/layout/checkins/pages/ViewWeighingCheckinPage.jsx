import React, { useEffect, useCallback } from "react";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import Box from "../../../components/Box/Box.jsx";
import Typography from "../../../components/Typography/Typography.jsx";
import PropTypes from "prop-types";
import { useWeighingCheckinData } from "../data/useWeighingCheckinData.jsx";
import AddEditCheckin from "../dialogs/AddEditCheckin.jsx";
import { FormProvider, useForm } from "react-hook-form";
import useCreateCheckin from "../../../api/checkins/useCreateCheckin.js";
import AddEditWeighingCheckinForm from "../forms/AddEditWeighingCheckinForm.jsx";
import DataTableGrid from "../../../controls/Tables/DataTableGrid/DataTableGrid.jsx";
import dayjs from "dayjs";
import { useMemo } from "react";

const ViewWeighingCheckinPage = ({
    data,
    isLoading,
    paginationModel,
    onPaginationModelChange,
    onSearchModelChange,
    onSortModelChange,
}) => {
    const { columns, rows, isAdding, setIsAdding } = useWeighingCheckinData(data.records);
    const createCheckin = useCreateCheckin();
    const methods = useForm({
        defaultValues: {
            date: dayjs(),
        },
    });

    const handleCloseDialog = useCallback(() => {
        setIsAdding({ adding: false, data: {} });
        methods.reset({ date: dayjs() });
    }, [setIsAdding, methods]);

    const onFormSubmit = useCallback(
        (formData) => {
            const dataToSave = {
                ...formData,
                client: isAdding.data._id,
            };
            createCheckin.mutate({ data: dataToSave, type: "weighing" });
        },
        [isAdding.data._id, createCheckin]
    );

    useEffect(() => {
        if (isAdding.adding) {
            methods.reset({ date: dayjs() });
        }
    }, [isAdding.adding, methods]);

    useEffect(() => {
        if (!createCheckin.isPending && createCheckin.isSuccess) {
            handleCloseDialog();
        }
    }, [createCheckin.isPending, createCheckin.isSuccess, handleCloseDialog]);

    const memoizedColumns = useMemo(() => columns, [columns]);
    const memoizedRows = useMemo(() => rows, [rows]);

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
                            <Typography variant="subtitle" color="white">
                              Clients Weighing Check-in
                            </Typography>
                        </Box>
                        <Box p={3}>
                            <DataTableGrid
                                table={{ columns: memoizedColumns, rows: memoizedRows }}
                                totalRecords={data.recordCount}
                                isDataLoading={isLoading}
                                paginationModel={paginationModel}
                                onPaginationModelChange={onPaginationModelChange}
                                searchModel={{ enabled: true, placeholder: "Search client", label: "Search" }}
                                onSearchModelChange={onSearchModelChange}
                                onSortModelChange={onSortModelChange}
                            />
                        </Box>
                    </Card>
                </Grid>
            </Grid>

            <AddEditCheckin
                openDialog={isAdding.adding}
                onClose={handleCloseDialog}
                title="Add New Check-in"
                fullName={`${isAdding.data.firstName} ${isAdding.data.lastName}`}
            >
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onFormSubmit)} noValidate>
                        <AddEditWeighingCheckinForm onCancel={handleCloseDialog} isLoading={createCheckin.isPending} />
                    </form>
                </FormProvider>
            </AddEditCheckin>
        </Box>
    );
};

ViewWeighingCheckinPage.propTypes = {
    data: PropTypes.shape({
        records: PropTypes.array.isRequired,
        recordCount: PropTypes.number.isRequired,
    }).isRequired,
    isLoading: PropTypes.bool,
    paginationModel: PropTypes.object,
    onPaginationModelChange: PropTypes.func,
    onSearchModelChange: PropTypes.func,
    onSortModelChange: PropTypes.func,
};

export default ViewWeighingCheckinPage;
