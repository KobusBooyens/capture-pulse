import React, { useCallback, useEffect } from "react";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import Box from "../../../components/Box/Box.jsx";
import Typography from "../../../components/Typography/Typography.jsx";
import { useGeneralCheckinData } from "../data/useGeneralCheckinData.jsx";
import PropTypes from "prop-types";
import AddEditCheckin from "../dialogs/AddEditCheckin.jsx";
import AddEditGeneralCheckinForm from "../forms/AddEditGeneralCheckinForm.jsx";
import { FormProvider, useForm } from "react-hook-form";
import { useCreateCheckin } from "../../../api/checkins/useCreateCheckinMutation.js";
import DataTableGrid from "../../../controls/Tables/DataTableGrid/DataTableGrid.jsx";
import dayjs from "dayjs";

const ViewGeneralCheckinPage = ({
    data,
    isLoading,
    paginationModel,
    onPaginationModelChange,
    onSearchModelChange,
    onSortModelChange
}) => {
    const { columns, rows, isAdding, setIsAdding } = useGeneralCheckinData(data?.records);
    const createCheckin = useCreateCheckin();
    const methods = useForm();

    const handleCloseDialog = useCallback(() => {
        setIsAdding({ adding: false, data: {} });
        methods.reset({
            date: dayjs()
        });
    }, [setIsAdding, methods]);

    useEffect(() => {
        methods.reset({
            date: dayjs()
        });
    }, [isAdding.data, methods]);

    useEffect(() => {
        if (!createCheckin.isPending && createCheckin.isSuccess) {
            handleCloseDialog();
        }
    }, [createCheckin.isPending, createCheckin.isSuccess, handleCloseDialog]);

    const onFormSubmit = useCallback(
        (formData) => {
            const dataToSave = {
                ...formData,
                client: isAdding.data._id
            };
            createCheckin.mutate({ data: dataToSave, type: "general" });
        },
        [createCheckin, isAdding.data._id]
    );

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
                            className="flex flex-row justify-between"
                        >
                            <Typography variant="subtitle" color="white">
                              Clients General Check-in
                            </Typography>
                        </Box>
                        <Box p={3}>
                            <DataTableGrid
                                table={{ columns, rows }}
                                totalRecords={data?.recordCount}
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
                        <AddEditGeneralCheckinForm onCancel={handleCloseDialog} isLoading={createCheckin.isPending} />
                    </form>
                </FormProvider>
            </AddEditCheckin>
        </Box>
    );
};

ViewGeneralCheckinPage.propTypes = {
    data: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    onPaginationModelChange: PropTypes.func,
    onSearchModelChange: PropTypes.func,
    onSortModelChange: PropTypes.func,
    paginationModel: PropTypes.object
};

export default ViewGeneralCheckinPage;
