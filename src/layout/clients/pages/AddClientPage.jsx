import React from "react";
import DashboardNavbar from "../../../controls/Navbars/DashboardNavbar/DashboardNavbar.jsx";
import DashboardLayout from "../../../controls/LayoutContainers/DashboardLayout.jsx";
import useMultistepForm from "../../../hooks/useMultistepForm.js";
import PersonalForm from "../forms/PersonalForm.jsx";
import PackageForm from "../forms/PackageForm.jsx";
import AboutYouForm from "../forms/AboutYouForm.jsx";
import Box from "../../../components/Box/Box.jsx";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "../../../components/Typography/Typography.jsx";

const AddClientPage = () => {

    const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultistepForm([
        { component: <PersonalForm/>, label: "Personal" },
        { component: <AboutYouForm/>, label: "About You" },
        { component: <PackageForm/>, label: "Package" }
    ]);

    return (
        <Box pt={6} pb={3}>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <Box
                            mx={2}
                            mt={-3}
                            py={3}
                            px={2}
                            variant="gradient"
                            bgColor="info"
                            borderRadius="lg"
                            coloredShadow="info"
                            className={"flex flex-row justify-between"}
                        >
                            <Typography variant="h5" color="white">Add Client</Typography>
                        </Box>
                        <Box pt={3}>

                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};
export default AddClientPage;
