import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import FormInputDropdown from "../../../components/Input/FormInputDropdown/FormInputDropdown.jsx";
import FormInputText from "../../../components/Input/FormInputText/FormInputText.jsx";
import FormInputDate from "../../../components/Input/FormInputDate/FormInputDate.jsx";
import usePackages from "../../../api/packages/usePackages.jsx";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";

const PackageForm = () => {
    const { data, isLoading } = usePackages();
    const { watch, setValue, getValues, formState: { defaultValues } } = useFormContext();

    const selectedPackageChange = watch("package._id");
    const [packageOptions, setPackageOptions] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        if (data && !isLoading) {
            setPackageOptions(data?.map((p) => {
                return { value: p._id, label: p.name };
            }));
        }
    }, [data, isLoading]);

    useEffect(() => {
        if (selectedPackageChange !== defaultValues.package?._id) {
            const amount = data.find(r => r?._id === selectedPackageChange)?.amount;
            setValue("amount", amount);
        } else {
            setValue("amount", defaultValues.amount);
        }
    }, [selectedPackageChange]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <FormInputDropdown
                    name="package._id"
                    label="Package"
                    placeholder={isLoading ? "Fetching packages..." : "Select Package"}
                    disabled={isLoading}
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
                <FormInputDate
                    name={"joiningDate"}
                    label={"Joining Date"}
                    required
                    rules={{ required: "Joining Date is required" }}
                />
            </Grid>
        </Grid>
    );
};
export default PackageForm;
