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
import Divider from "@mui/material/Divider";

const MembershipForm = ({ isLoading, onCancel }) => {
    const { watch, setValue, getValues, formState: { defaultValues } } = useFormContext();
  
    const goals = useGoals();
    const packages = usePackages();

    const selectedPackageChange = watch("package");
    const [packageOptions, setPackageOptions] = useState([]);

    useEffect(() => {
        if (packages?.data && !isLoading) {
            const options = packages?.data.map(p => ({ value: p._id.toString(), label: p.name }));
            setPackageOptions(options);
        }
    }, [packages.data, isLoading]);

    useEffect(() => {
        if (selectedPackageChange !== defaultValues?.package) {
            const amount = packages?.data.find(r => r?._id === selectedPackageChange)?.amount;
            setValue("amount", amount);
        } else {
            setValue("amount", defaultValues?.amount);
        }
    },[packages?.data]);
    // const [goalOptions, setGoalOptions] = useState([]);

    const goalOptions = !goals.isPending && goals.isSuccess && goals.data ?
        goals?.data.map(g => ({ label: g.name, value: g.name })) : [];

    // useEffect(() => {
    //     if (goals.data) {
    //         setGoalOptions();
    //     }
    // }, [goals.data]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <FormInputDropdown
                    key={"package"}
                    name="package"
                    label={"Package"}
                    placeholder={isLoading ? "Fetching packages..." : "Select Package"}
                    disabled={isLoading }
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
                    disabled={!selectedPackageChange}
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
                    name="pamymentDay"
                    label={"Payment Day"}
                    placeholder={"Select Payment Day"}
                    // disabled={isLoading }
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