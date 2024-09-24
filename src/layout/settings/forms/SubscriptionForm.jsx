import React from "react";
import { CircularProgress, Grid, Skeleton } from "@mui/material";
import FormInputText from "../../../components/Input/FormInputText/FormInputText.jsx";
import FormInputDropdown from "../../../components/Input/FormInputDropdown/FormInputDropdown.jsx";
import Box from "../../../components/Box/Box.jsx";
import Button from "../../../components/Button/Button.jsx";
import currencies from "../../../data/currencyOptions.js";
import PropTypes from "prop-types";

const currencyOptions = currencies.map(c => ({ value: c.code, label: `${c.code} - ${c.name}` }));

const SkeletonView = () => {
    return (
        <>
            <Grid item xs={12} md={12} lg={6}>
                <Skeleton variant="rectangular" height={60} animation={"wave"} />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
                <Skeleton variant="rectangular" height={60} animation={"wave"}/>
            </Grid>
        </>
    );
};

const FormView = () => {
    return (
        <>
            <Grid item xs={12} md={12} lg={6}>
                <FormInputText
                    variant={"standard"}
                    key={"name"}
                    name={"name"}
                    label="Subscription Name"
                    placeholder="Enter Subscription Name"
                    required
                    rules={{ required: "Subscription Name is required" }}
                    fullWidth />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
                <FormInputDropdown
                    variant={"standard"}
                    key={"currency"}
                    name="currency"
                    label={"Currency"}
                    placeholder={"Select Currency"}
                    options={currencyOptions}
                    required
                    rules={{ required: "Currency is required" }}
                />
            </Grid>
        </>
    );
};

const SubscriptionForm = ({ isUpdating, isFetching, onCancel }) => {

    return (
        <Grid container spacing={3}>
            {isFetching ? <SkeletonView/> : <FormView/>}

            <Box display="flex" justifyContent="end" marginTop={2} width="100%" mb={2}>
                {isUpdating && <CircularProgress/>}
                {!isUpdating &&
                <>
                    <Button onClick={onCancel}
                        color="secondary"
                        type={"button"}
                        disabled={isFetching}
                        sx={{ mx: 1 }}>
                Cancel
                    </Button>
                    <Button
                        color="primary"
                        type={"submit"}
                        disabled={isFetching}
                        sx={{ mx: 1 }}>
                Update
                    </Button>
                </>
                }
            </Box>
        </Grid>
    );
};
SubscriptionForm.propTypes = {
    isUpdating: PropTypes.bool,
    isFetching: PropTypes.bool,
    onCancel: PropTypes.func,
};

export default SubscriptionForm;
