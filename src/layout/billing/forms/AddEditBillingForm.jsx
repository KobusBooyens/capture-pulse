import React from "react";
import FormInputText from "../../../components/Input/FormInputText/FormInputText.jsx";
import { CircularProgress, Grid } from "@mui/material";
import FormInputDate from "../../../components/Input/FormInputDate/FormInputDate.jsx";
import Button from "../../../components/Button/Button.jsx";
import Box from "../../../components/Box/Box.jsx";
import PropTypes from "prop-types";

const AddEditBillingForm = ({ onCancel, isLoading }) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <FormInputDate
                    name={"date"}
                    label={"Date"}
                    fullWidth
                    required
                    rules={{ required: "Date date is required" }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormInputText
                    name="amount"
                    label="Amount"
                    placeholder="Enter amount received"
                    type={"number"}
                    required
                    rules={{ required: "Amount is required" }}
                    fullWidth />
            </Grid>
            <Grid item xs={12} md={12}>
                <FormInputText
                    name="reference"
                    label="Reference"
                    placeholder="Reference for payment received"
                    required
                    rules={{ required: "Reference is required" }}
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

AddEditBillingForm.propTypes = {
    onCancel: PropTypes.func,
    isLoading: PropTypes.bool
};

export default AddEditBillingForm;
