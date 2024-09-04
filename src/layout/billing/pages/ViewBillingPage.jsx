import React from "react";
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

const ViewBillingPage = ({
    data,
    isLoading,
    paginationModel,
    onPaginationModelChange,
    onSearchModelChange,
    onSortModelChange,
},
) => {

    const { columns, rows } = useBillingData(data.records);
  
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
            {/*<AddEditCheckin*/}
            {/*  openDialog={isActioned.action === "edit"}*/}
            {/*  onClose={handleCloseDialog}*/}
            {/*  title={"Edit Check-in"}*/}
            {/*  fullName={`${data.records.client?.firstName} ${data.records.client?.lastName}`}*/}
            {/*>*/}
            {/*  <FormProvider {...methods}>*/}
            {/*    <form onSubmit={methods.handleSubmit(onFormSubmit)} noValidate>*/}
            {/*      {type === "general" ?*/}
            {/*        <AddEditGeneralCheckinForm onCancel={handleCloseDialog}*/}
            {/*                                   isLoading={editCheckin.isPending}*/}
            {/*        /> :*/}
            {/*        <AddEditWeighingCheckinForm onCancel={handleCloseDialog}*/}
            {/*                                    isLoading={editCheckin.isPending}*/}
            {/*        />*/}
            {/*      }*/}
            {/*    </form>*/}
            {/*  </FormProvider>*/}
            {/*</AddEditCheckin>*/}
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
