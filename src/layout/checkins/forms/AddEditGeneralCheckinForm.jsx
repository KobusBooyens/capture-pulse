import React from "react";
import FormInputText from "../../../components/Input/FormInputText/FormInputText.jsx";
import { CircularProgress, Grid } from "@mui/material";
import FormInputDate from "../../../components/Input/FormInputDate/FormInputDate.jsx";
import FormInputDropdown from "../../../components/Input/FormInputDropdown/FormInputDropdown.jsx";
import moodOptions from "../../../data/moodOptions.jsx";
import Button from "../../../components/Button/Button.jsx";
import Box from "../../../components/Box/Box.jsx";
import PropTypes from "prop-types";

const AddEditGeneralCheckinForm = ({ onCancel, isLoading }) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <FormInputDate
                    name={"date"}
                    label={"Check-in date"}
                    fullWidth
                    required
                    rules={{ required: "Check-in date is required" }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormInputDropdown
                    name="mood"
                    label="Mood"
                    placeholder="Select Mood"
                    options={moodOptions.options}
                    fullWidth
                    required
                    rules={{ required: "Mood is required" }}
                />
            </Grid>
            <Grid item xs={12} md={12}>
                <FormInputText
                    name="feedback"
                    label="Feedback"
                    placeholder="Add any feedback"
                    multiline
                    minRows={3}
                    fullWidth />
            </Grid>
            <Box display="flex" justifyContent="end" marginTop={2} width="100%" mb={2}>
                {isLoading && <CircularProgress/>}
                {!isLoading &&
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
                }
            </Box>
        </Grid>
    );
};

AddEditGeneralCheckinForm.propTypes = {
    onCancel: PropTypes.func,
    isLoading: PropTypes.bool
};

export default AddEditGeneralCheckinForm;
