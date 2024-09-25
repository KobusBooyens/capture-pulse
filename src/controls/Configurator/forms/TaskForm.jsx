import React from "react";
import { Checkbox, CircularProgress, FormControlLabel, Grid, InputAdornment } from "@mui/material";
import FormInputText from "../../../components/Input/FormInputText/FormInputText.jsx";
import FormInputDate from "../../../components/Input/FormInputDate/FormInputDate.jsx";
import Icon from "@mui/material/Icon";
import Typography from "../../../components/Typography/Typography.jsx";
import Button from "../../../components/Button/Button.jsx";
import Box from "../../../components/Box/Box.jsx";
import PropTypes from "prop-types";
import UserForm from "../../../layout/users/forms/UserForm.jsx";
import FormInputCheckbox from "../../../components/Input/FormInputCheckbox/FormInputCheckbox.jsx";

const TaskForm = ({ onCancel }) => {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
                <FormInputText
                    autoFocus
                    variant={"standard"}
                    key={"title"}
                    name={"title"}
                    // label="Title"
                    placeholder="Title"
                    required
                    startAdornment={
                        <InputAdornment position="start">
                            <Icon>title</Icon>
                        </InputAdornment>
                    }
                    rules={{ required: "Title is required" }}
                    fullWidth />
            </Grid>
            <Grid item xs={12} md={12}>
                <FormInputText
                    variant={"standard"}
                    key={"description"}
                    name={"description"}
                    startAdornment={
                        <InputAdornment position="start">
                            <Icon>notes</Icon>
                        </InputAdornment>
                    }
                    placeholder="Description"
                    fullWidth />
            </Grid>
            <Grid item xs={12} md={12}>
                <FormInputDate
                    variant={"standard"}
                    key={"dateTime"}
                    name={"dateTime"}
                    label={"Date/time"}
                    maxDate={null}
                    fullWidth />
            </Grid>
            <Grid item xs={12} md={12}>
                <FormInputCheckbox name={"teamTask"} label={"Team Task/Reminder"}/>
            </Grid>
            <Box display="flex" justifyContent="end" marginTop={2} width="100%" mb={2}>
                <>
                    <Button onClick={onCancel}
                        color="secondary"
                        type={"button"}
                        sx={{ mx: 1 }}>
                  CANCEL
                    </Button>
                    <Button
                        color="primary"
                        type={"submit"}
                        sx={{ mx: 1 }}>
                  SUBMIT
                    </Button>
                </>
            </Box>
        </Grid>
    );
};

UserForm.prototype = {
    onCancel: PropTypes.func,
    isLoading: PropTypes.bool,
    adding: PropTypes.bool,
};
export default TaskForm;
