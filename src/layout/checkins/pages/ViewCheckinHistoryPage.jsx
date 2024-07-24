import React, { useEffect, useMemo } from "react";
import Box from "../../../components/Box/Box.jsx";
import { CircularProgress, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "../../../components/Typography/Typography.jsx";
import ClientDetails from "../../shared/ClientDetails.jsx";
import PropTypes from "prop-types";
import useCheckins from "../../../api/checkins/useCheckins.js";
import { useCheckinHistoryData } from "../data/useCheckinHistoryData.jsx";
import DataTable from "../../../controls/Tables/DataTable/DataTable.jsx";
import DataTableSkeleton from "../../../controls/Tables/Skeleton/DataTable.jsx";
import { FormProvider, useForm } from "react-hook-form";
import useEditCheckin from "../../../api/checkins/useEditCheckin.js";
import AddEditCheckin from "../dialogs/AddEditCheckin.jsx";
import AddEditGeneralCheckinForm from "../forms/AddEditGeneralCheckinForm.jsx";
import AddEditWeighingCheckinForm from "../forms/AddEditWeighingCheckinForm.jsx";
import DeleteDialog from "../../../controls/Dialogs/DeleteDialog.jsx";
import useDeleteCheckin from "../../../api/checkins/useDeleteCheckin.js";

const ViewCheckinHistoryPage = ({ type }) => {

    const { isLoading, data: checkInData } = useCheckins(type);
    const editCheckin = useEditCheckin();
    const deleteCheckin = useDeleteCheckin();
    const { columns, rows, isActioned, setIsActioned } = useCheckinHistoryData(type, checkInData?.records);
    const methods = useForm();

    const handleCloseDialog = () => {
        setIsActioned({ action: null, data: {} });
    };

    useEffect(() => {
        console.log(isActioned);
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
        const dataToSave = {
            ...data,
            client: checkInData.client._id
        };
        console.log(dataToSave);
        editCheckin.mutate({ id: data._id, updatedData: dataToSave, type });
    };

    const fullName = useMemo(() => {
        return checkInData ?
            <ClientDetails
                name={checkInData.client?.firstName}
                surname={checkInData.client?.lastName}
                contactNumber={checkInData.client?.contactNumber}
            />
            : 
            <CircularProgress />
        ;
    }, [checkInData]);
    
    const dataTable = useMemo(() => {
        return checkInData ?
            <DataTable
                table={{ columns, rows }}
                entriesPerPage={10}
                canSearch={true}
                noEndBorder
                isSorted={true}
                showTotalEntries={true}
            />
            : 
            <DataTableSkeleton />
        ;
    }, [checkInData, columns, rows]);

    if (isLoading) {
        return <CircularProgress />;
    }
    
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
                            <Typography variant="h5" color="white" textTransform={"uppercase"}>
                                {type}
                            </Typography>
                        </Box>
                        <Box pt={3}>
                            {dataTable}
                        </Box>
                    </Card>
                </Grid>
            </Grid>
            <AddEditCheckin
                openDialog={isActioned.action === "edit"}
                onClose={handleCloseDialog}
                title={"Edit Check-in"}
                fullName={`${checkInData.client.firstName} ${checkInData.client.lastName}`}
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
    type: PropTypes.oneOf(["General", "Weighing"])
};

export default ViewCheckinHistoryPage;
