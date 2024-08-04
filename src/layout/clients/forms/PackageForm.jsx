import React, { useEffect, useMemo, useState } from "react";
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Grid } from "@mui/material";
import FormInputDropdown from "../../../components/Input/FormInputDropdown/FormInputDropdown.jsx";
import FormInputText from "../../../components/Input/FormInputText/FormInputText.jsx";
import FormInputDate from "../../../components/Input/FormInputDate/FormInputDate.jsx";
import usePackages from "../../../api/packages/usePackages.jsx";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";

import PersonalForm from "./PersonalForm.jsx";
import Typography from "../../../components/Typography/Typography.jsx";
import Divider from "@mui/material/Divider";
import Box from "../../../components/Box/Box.jsx";
import AboutYouForm from "./AboutYouForm.jsx";
import Icon from "@mui/material/Icon";

const PackageForm = () => {
    const { data, isLoading } = usePackages();
    const { watch, setValue, getValues, formState: { defaultValues } } = useFormContext();

    const selectedPackageChange = watch("package._id");
    const [packageOptions, setPackageOptions] = useState([]);
    const [showPartnerSection, setShowPartnerSection] = useState(false);
    console.log(getValues());
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
        setShowPartnerSection(packageOptions.find(r => r.value === selectedPackageChange)?.label === "Couples");
    }, [selectedPackageChange]);

    const AddPartner = useMemo(() => {
        return (
            <Box padding={3}>
                <Box padding={3}>
                    <Divider>Complete Partner's Details</Divider>
                </Box>
                <Box flex={"display"} gap={2}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<Icon>expand_more</Icon>}
                            aria-controls="panel-Personal" id="panel-Personal">
                            Personal Info
                        </AccordionSummary>
                        <AccordionDetails>
                            <PersonalForm addPartner={true} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<Icon>expand_more</Icon>}
                            aria-controls="panel-about" id="panel-about">
                            About You
                        </AccordionSummary>
                        <AccordionDetails>
                            <AboutYouForm addPartner={true} />
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Box>
        );
    }, []);

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <FormInputDropdown
                        key={"package"}
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
                    <FormInputDate
                        name={"joiningDate"}
                        label={"Joining Date"}
                        required
                        rules={{ required: "Joining Date is required" }}
                    />
                </Grid>
            </Grid>

            {showPartnerSection &&
            AddPartner
            }
        </>

    );
};
export default PackageForm;
