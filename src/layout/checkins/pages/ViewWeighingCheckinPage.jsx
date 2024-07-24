import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import Box from "../../../components/Box/Box.jsx";
import Typography from "../../../components/Typography/Typography.jsx";
import DataTable from "../../../controls/Tables/DataTable/DataTable.jsx";
import PropTypes from "prop-types";
import { useWeighingCheckinData } from "../data/useWeighingCheckinData.jsx";
import AddEditCheckin from "../dialogs/AddEditCheckin.jsx";
import { FormProvider, useForm } from "react-hook-form";
import useCreateCheckin from "../../../api/checkins/useCreateCheckin.js";
import AddEditWeighingCheckinForm from "../forms/AddEditWeighingCheckinForm.jsx";

const ViewWeighingCheckinPage = ({ data }) => {
    const { columns, rows, isAdding, setIsAdding } = useWeighingCheckinData(data);

    const createCheckin = useCreateCheckin();
    const methods = useForm();

    const handleCloseDialog = () => {
        setIsAdding({ adding: false, data: {} });
        methods.reset({});
    };

    useEffect(() => {
        if (!createCheckin.isPending && createCheckin.isSuccess) {
            handleCloseDialog();
        }

    }, [createCheckin.isPending, createCheckin.isSuccess]);

    const onFormSubmit = (data) => {
        const dataToSave = {
            ...data,
            client: isAdding.data._id
        };
        createCheckin.mutate({ data: dataToSave, type: "weighing" });
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
                            <Typography variant="h5" color="white">Clients Weighing Check-in</Typography>
                        </Box>
                        <Box pt={3}>
                            <DataTable
                                table={{ columns, rows }}
                                entriesPerPage={10}
                                canSearch={true}
                                noEndBorder
                                isSorted={true}
                                showTotalEntries={true}
                            />
                        </Box>
                    </Card>
                </Grid>
            </Grid>

            <AddEditCheckin
                openDialog={isAdding.adding}
                onClose={handleCloseDialog}
                title={"Add New Check-in"}
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
    data: PropTypes.objectOf(PropTypes.array).isRequired
};

export default ViewWeighingCheckinPage;
