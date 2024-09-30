import React, { useEffect, useMemo, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Grid } from "@mui/material";
import FormInputDropdown from "../../../components/Input/FormInputDropdown/FormInputDropdown.jsx";
import FormInputText from "../../../components/Input/FormInputText/FormInputText.jsx";
import FormInputDate from "../../../components/Input/FormInputDate/FormInputDate.jsx";
import { usePackages } from "../../../api/packages/usePackageFetch.js";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import PersonalForm from "./PersonalForm.jsx";
import Divider from "@mui/material/Divider";
import Box from "../../../components/Box/Box.jsx";
import AboutYouForm from "./AboutYouForm.jsx";
import Icon from "@mui/material/Icon";
import Typography from "../../../components/Typography/Typography.jsx";

const PackageForm = () => {
    const { id } = useParams();

    const { data, isLoading } = usePackages();
    const { watch, setValue, getValues, formState: { defaultValues } } = useFormContext();

    const selectedPackageChange = watch("package");
    const [packageOptions, setPackageOptions] = useState([]);
    const [showPartnerSection, setShowPartnerSection] = useState(false);

    const paymentDayList = [
        { value: "1", label: "1st" },
        { value: "5", label: "5th" },
        { value: "15", label: "15th" },
        { value: "25", label: "25th" },
        { value: "28", label: "28th" },
    ];

    useEffect(() => {
        if (data && !isLoading) {
            const options = data.map(p => ({ value: p._id.toString(), label: p.name }));
            setPackageOptions(options);
        }
    }, [data, isLoading]);

    useEffect(() => {
        if (selectedPackageChange !== defaultValues.package) {
            const amount = data.find(r => r?._id === selectedPackageChange)?.amount;
            setValue("amount", amount);
        } else {
            setValue("amount", defaultValues.amount);
        }

        //when id is passed in params then we are editing, we only want to
        // display the partner section when adding a client
        if (!id && packageOptions.length > 0) {
            setShowPartnerSection(packageOptions.find(r =>
                r.value === selectedPackageChange)?.label === "Couples");
            setValue("isCouplePackage", packageOptions.find(r =>
                r.value === selectedPackageChange)?.label === "Couples");
        }
    }, [selectedPackageChange, defaultValues, getValues, data, packageOptions]);

    const AddPartner = useMemo(() => {
        return (
            <Box padding={3}>
                <Divider/>
                <Box className={"flex flex-row justify-center m-4"}>
                    <Typography fontWeight={"light"}>
                        Complete Partners Details
                    </Typography>
                </Box>
                <Box flex={"display"} gap={2}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<Icon>expand_more</Icon>}
                            aria-controls="panel-Personal" id="panel-Personal">
                            <Typography textTransform={"uppercase"} color={"inherit"}>
                                Personal Info
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <PersonalForm addPartner={true} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<Icon>expand_more</Icon>}
                            aria-controls="panel-about" id="panel-about">
                            <Typography textTransform={"uppercase"} color={"inherit"}>
                                About You
                            </Typography>
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
                    <FormInputDate
                        name={"joiningDate"}
                        label={"Joining Date"}
                        maxDate={null}
                        required
                        rules={{ required: "Joining Date is required" }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormInputDropdown
                        key={"paymentDay"}
                        name="pamymentDay"
                        label={"Payment Day"}
                        placeholder={"Select Payment Day"}
                        // disabled={isLoading }
                        options={paymentDayList}
                        required
                        rules={{ required: "Payment Day is required" }}
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
