import React from "react";
import FormInputText from "../../../components/Input/FormInputText/FormInputText.jsx";
import { CircularProgress, Grid } from "@mui/material";
import FormInputDate from "../../../components/Input/FormInputDate/FormInputDate.jsx";
import Box from "../../../components/Box/Box.jsx";
import Button from "../../../components/Button/Button.jsx";
import PropTypes from "prop-types";

const AddEditWeighingCheckinForm = ({ onCancel, isLoading }) => {
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
                <FormInputText
                    name="weight"
                    label="Weight"
                    required
                    type={"number"}
                    rules={{
                        required: "Weight is required", min: {
                            value: 0,
                            message: "Weight must be greater than 0"
                        }
                    }}
                    fullWidth />
            </Grid>
            <Grid item xs={12} md={12}>
                <FormInputText
                    name="feedback"
                    label="Feedback"
                    minValue={0}
                    placeholder="Add any feedback"
                    required
                    multiline
                    minRows={3}
                    rules={{ required: "Feedback is required" }}
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

AddEditWeighingCheckinForm.propTypes = {
    onCancel: PropTypes.func,
    isLoading: PropTypes.bool
};

export default AddEditWeighingCheckinForm;
