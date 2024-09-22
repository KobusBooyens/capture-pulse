import React from "react";
import { Grid } from "@mui/material";
import FormInputText from "../../../components/Input/FormInputText/FormInputText.jsx";
import FormInputDropdown from "../../../components/Input/FormInputDropdown/FormInputDropdown.jsx";
import Box from "../../../components/Box/Box.jsx";
import Button from "../../../components/Button/Button.jsx";

const SubscriptionForm = ({ onCancel }) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
                <FormInputText
                    key={"subscriptionName"}
                    name={"subscriptionName"}
                    label="Subscription Name"
                    placeholder="Enter Subscription Name"
                    required
                    rules={{ required: "Subscription Name is required" }}
                    fullWidth />
            </Grid>
            <Box display="flex" justifyContent="end" marginTop={2} width="100%" mb={2}>
                {/*{isLoading && <CircularProgress/>}*/}
                {/*{!isLoading &&*/}
                <>
                    <Button onClick={onCancel}
                        color="secondary"
                        type={"button"}
                        sx={{ mx: 1 }}>
                Cancel
                    </Button>
                    <Button
                        color="primary"
                        type={"submit"}
                        sx={{ mx: 1 }}>
                Update
                    </Button>
                </>
                {/*}*/}
            </Box>
        </Grid>
    );
};
export default SubscriptionForm;
