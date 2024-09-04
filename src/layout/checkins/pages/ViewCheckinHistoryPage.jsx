import React, { useEffect, useMemo } from "react";
import Box from "../../../components/Box/Box.jsx";
import { CircularProgress, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "../../../components/Typography/Typography.jsx";
import ClientDetails from "../../shared/ClientDetails.jsx";
import PropTypes from "prop-types";
import { useCheckinHistoryData } from "../data/useCheckinHistoryData.jsx";
import { FormProvider, useForm } from "react-hook-form";
import useEditCheckin from "../../../api/checkins/useEditCheckin.js";
import AddEditCheckin from "../dialogs/AddEditCheckin.jsx";
import AddEditGeneralCheckinForm from "../forms/AddEditGeneralCheckinForm.jsx";
import AddEditWeighingCheckinForm from "../forms/AddEditWeighingCheckinForm.jsx";
import DeleteDialog from "../../../controls/Dialogs/DeleteDialog.jsx";
import useDeleteCheckin from "../../../api/checkins/useDeleteCheckin.js";
import DataTableGrid from "../../../controls/Tables/DataTableGrid/DataTableGrid.jsx";

const ViewCheckinHistoryPage = ({
    type,
    data,
    isLoading,
    paginationModel,
    onPaginationModelChange,
    onSearchModelChange,
    onSortModelChange
}) => {
    const editCheckin = useEditCheckin();
    const deleteCheckin = useDeleteCheckin();
    const { columns, rows, isActioned, setIsActioned } = useCheckinHistoryData(type, data?.records);
    const methods = useForm();

    const handleCloseDialog = () => {
        setIsActioned({ action: null, data: {} });
    };

    useEffect(() => {
        methods.reset({ ...isActioned.data });
    }, [isActioned.action]);

    useEffect(() => {
        if (!editCheckin.isPending && editCheckin.isSuccess ||
          !deleteCheckin.isPending && deleteCheckin.isSuccess) {
            handleCloseDialog();
        }

    }, [editCheckin.isPending, editCheckin.isSuccess,
        deleteCheckin.isPending, deleteCheckin.isSuccess]);

    const onFormSubmit = (data) => {
        console.log("onFormSubmit", data);
        const dataToSave = {
            ...data,
            client: data.client._id
        };
        console.log(dataToSave);
        editCheckin.mutate({ id: data._id, updatedData: dataToSave, type });
    };

    const fullName = data ?
        <ClientDetails
            name={data.records.client?.firstName}
            surname={data.records.client?.lastName}
            contactNumber={data.records.client?.contactNumber}
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
                            <Typography variant="subtitle" color="white" textTransform={"uppercase"}>
                                {type}
                            </Typography>
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
            <AddEditCheckin
                openDialog={isActioned.action === "edit"}
                onClose={handleCloseDialog}
                title={"Edit Check-in"}
                fullName={`${data.records.client?.firstName} ${data.records.client?.lastName}`}
            >
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onFormSubmit)} noValidate>
                        {type === "general" ?
                            <AddEditGeneralCheckinForm onCancel={handleCloseDialog}
                                isLoading={editCheckin.isPending}
                            /> :
                            <AddEditWeighingCheckinForm onCancel={handleCloseDialog}
                                isLoading={editCheckin.isPending}
                            />
                        }
                    </form>
                </FormProvider>
            </AddEditCheckin>
            <DeleteDialog
                openDialog={isActioned.action === "delete"}
                onClose={handleCloseDialog}
                onConfirm={() => deleteCheckin.mutate({ id: isActioned.data._id, type })}
                isLoading={deleteCheckin.isPending}
            />
        </Box>
    );
};

ViewCheckinHistoryPage.propTypes = {
    type: PropTypes.oneOf(["General", "Weighing"]),
    data: PropTypes.objectOf(PropTypes.array).isRequired,
    isLoading: PropTypes.bool,
    onPaginationModelChange: PropTypes.func,
    onSearchModelChange: PropTypes.func,
    onSortModelChange: PropTypes.func,
    paginationModel: PropTypes.object
};

export default ViewCheckinHistoryPage;
