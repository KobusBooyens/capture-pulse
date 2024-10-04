import React, { useEffect, useState } from "react";
import { CircularProgress, Grid } from "@mui/material";
import FormInputText from "../../../components/Input/FormInputText/FormInputText.jsx";
import FormInputDropdown from "../../../components/Input/FormInputDropdown/FormInputDropdown.jsx";
import { useGoals } from "../../../api/goals/useGoalFetch.js";
import Box from "../../../components/Box/Box.jsx";
import Button from "../../../components/Button/Button.jsx";
import { usePackages } from "../../../api/packages/usePackageFetch.js";
import { useFormContext } from "react-hook-form";
import paymentDayOptions from "../../../data/paymentDayOptions.js";
import FormInputDate from "../../../components/Input/FormInputDate/FormInputDate.jsx";

const MembershipForm = ({ isLoading, onCancel }) => {
    const { watch, setValue, getValues, reset, formState: { defaultValues } } = useFormContext();
  
    const goals = useGoals();
    const packages = usePackages();

    const packageOptions = packages.data ? packages.data.map(record => ({
        value: record._id.toString(),
        label: record.name
    })) : [];

    const goalOptions = goals.data ? goals?.data.map(record => ({
        value: record._id.toString(),
        label: record.name,
    })) : [];

    const watchedPackage = watch("package");
    const watchedAmount = watch("amount");

    useEffect(() => {
        if (!watchedAmount && packages.data) {
            setValue("amount", packages.data.find(r => r._id === watch("package"))?.amount);
        }
    }, [packages.data, watchedPackage, watchedAmount]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <FormInputDropdown
                    key={"package"}
                    name="package"
                    label={"Package"}
                    placeholder={packages.isLoading ? "Fetching packages..." : "Select Package"}
                    disabled={packages.isLoading }
                    options={packageOptions}
                    required
                    rules={{ required: "Package is required" }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormInputText
                    key={getValues("amount")}
                    name={"amount"}
                    label={"Amount"}
                    type={"number"}
                    placeholder={"Enter Amount"}
                    disabled={!watchedPackage}
                    fullWidth
                    required
                    rules={{
                        required: "Amount is required", min: {
                            value: 0,
                            message: "Amount must be greater than 0"
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormInputDropdown
                    key={"paymentDay"}
                    name="paymentDay"
                    label={"Payment Day"}
                    placeholder={"Select Payment Day"}
                    options={paymentDayOptions}
                    required
                    rules={{ required: "Payment Day is required" }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormInputDate
                    name={"joiningDate"}
                    label={"Joining Date"}
                    maxDate={null}
                    required
                    rules={{ required: "Joining Date is required" }}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <FormInputText
                    key={"weight"}
                    name={"weight"}
                    label={"Weight"}
                    type={"number"}
                    placeholder={"Enter Current Weight (kg) e.g. 80"}
                    fullWidth
                    required
                    rules={{
                        required: "Weight is required", min: {
                            value: 0,
                            message: "Weight must be greater than 0"
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormInputText
                    key={"height"}
                    name={"height"}
                    label={"Height"}
                    type={"number"}
                    placeholder={"Enter Height (cm) e.g. 180"}
                    fullWidth
                    required
                    rules={{
                        required: "Height is required", min: {
                            value: 0,
                            message: "Height must be greater than 0"
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormInputDropdown
                    name={"goal"}
                    label={goals.isPending ? "Loading goals..." : "Goal"}
                    placeholder={"Select a goal"}
                    disabled={goals.isPending}
                    options={goalOptions}
                    required
                    rules={{ required: "Goal is required" }}
                />
            </Grid>
            <Box display="flex" justifyContent="end" marginTop={2} width="100%">
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

export default MembershipForm;