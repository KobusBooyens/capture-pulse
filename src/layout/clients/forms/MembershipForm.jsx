import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Autocomplete, CircularProgress, Grid } from "@mui/material";
import FormInputText from "../../../components/Input/FormInputText/FormInputText.jsx";
import FormInputDropdown from "../../../components/Input/FormInputDropdown/FormInputDropdown.jsx";
import { useGoals } from "../../../api/goals/useGoalFetch.js";
import Box from "../../../components/Box/Box.jsx";
import Button from "../../../components/Button/Button.jsx";
import { usePackages } from "../../../api/packages/usePackageFetch.js";
import { useFormContext } from "react-hook-form";
import paymentDayOptions from "../../../data/paymentDayOptions.js";
import FormInputDate from "../../../components/Input/FormInputDate/FormInputDate.jsx";
import { useClientDropDown } from "../../../api/clients/useClientMutation.js";

const MembershipForm = ({ isLoading, onCancel }) => {
    const { watch, setValue, getValues, formState: { defaultValues } } = useFormContext();

    const selectedPackageChange = watch("package");
  
    const [isSelectedPackageCouple, setIsSelectedPackageCouple] = useState(null);
    const [clientAutoCompleteValues, setClientAutoCompleteValues] = useState([]);
    const [selectedClients, setSelectedClients] = useState([]);
  
    const goals = useGoals();
    const packages = usePackages();
    const clientDropDown = useClientDropDown();

    const packageOptions = useMemo(() =>
        packages.data ? packages.data.map(record => ({
            value: record._id.toString(),
            label: record.name
        })) : [],
    [packages.data]
    );

    const goalOptions = useMemo(() =>
        goals.data ? goals.data.map(record => ({
            value: record._id.toString(),
            label: record.name
        })) : [],
    [goals.data]
    );

    useEffect(() => {
        if (selectedPackageChange !== defaultValues?.package) {
            const amount = packages?.data?.find(r => r?._id === selectedPackageChange)?.amount;
            setValue("amount", amount);
        } else {
            setValue("amount", defaultValues?.amount);
        }

    }, [selectedPackageChange, defaultValues, setValue]);

    useEffect(() => {
        const packageDetails = packages?.data?.find(r => r._id === selectedPackageChange);

        const isCouplePackage = packageDetails?.name === "Couples";
        setIsSelectedPackageCouple(isCouplePackage);

        if (isCouplePackage) {
            const selectedClientIds = getValues("clients");
            clientDropDown.mutate({}, {
                onSuccess: (data) => {
                    setClientAutoCompleteValues(data.data);

                    const matchedClients = data.data.filter(client =>
                        selectedClientIds.includes(client._id)
                    );
                    setSelectedClients(matchedClients);
                }
            });
        }
    }, [selectedPackageChange]);

    const handleCancel = useCallback(() => {
        onCancel();
        setIsSelectedPackageCouple(false);
    }, [onCancel]);

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
            {isSelectedPackageCouple &&
            <Grid item xs={12} md={12}>
                <Autocomplete
                    multiple
                    id="clients"
                    options={clientAutoCompleteValues}
                    getOptionLabel={(option) => option.fullName}
                    getOptionDisabled={(option) => option._id === getValues("_id")}
                    isOptionEqualToValue={(options, value) => options._id === value._id}
                    value={selectedClients}
                    onChange={(event, newValue) => {
                        setSelectedClients(newValue);
                        setValue("clients", newValue.map(client => client._id));
                    }}
                    loading={clientDropDown.isPending}
                    renderInput={(params) =>
                        <FormInputText
                            variant={"standard"}
                            {...params}
                            key={"clients"}
                            name={"clients"}
                            label={"Couple Partner"}
                            disabled={clientDropDown.isPending}
                            placeholder={"Select another client to complete the couple"}
                            required={isSelectedPackageCouple}
                            rules={{
                                required: "Couple is required"
                            }}
                        />
                    }
                />
            </Grid>
            }
            <Box display="flex" justifyContent="end" marginTop={2} width="100%">
                {isLoading && <CircularProgress/>}
                {!isLoading &&
              <>
                  <Button onClick={handleCancel}
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