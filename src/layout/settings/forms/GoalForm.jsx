import React from "react";
import { Grid } from "@mui/material";
import FormInputText from "../../../components/Input/FormInputText/FormInputText.jsx";
import Button from "../../../components/Button/Button.jsx";

const GoalForm = () => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={6}>
                <FormInputText
                    key={"goal"}
                    name={"goal"}
                    label="New Goal"
                    placeholder="Enter Goal"
                    required
                    rules={{ required: "Goal is required" }}
                    fullWidth />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
                <Button color={"primary"} fullWidth>Add</Button>
            </Grid>
        </Grid>
    );
};
export default GoalForm;
