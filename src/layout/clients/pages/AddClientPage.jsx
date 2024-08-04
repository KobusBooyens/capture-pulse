import React, { useEffect } from "react";
import useMultistepForm from "../../../hooks/useMultistepForm.js";
import PersonalForm from "../forms/PersonalForm.jsx";
import PackageForm from "../forms/PackageForm.jsx";
import AboutYouForm from "../forms/AboutYouForm.jsx";
import Box from "../../../components/Box/Box.jsx";
import { CircularProgress, Grid, Step, StepLabel, Stepper } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "../../../components/Typography/Typography.jsx";
import { FormProvider, useForm } from "react-hook-form";
import useCreateClient from "../../../api/clients/useCreateClient.js";
import Button from "../../../components/Button/Button.jsx";
import { useNavigate } from "react-router-dom";

const AddClientPage = () => {
    const methods = useForm();
    const createClient = useCreateClient();
    const navigate = useNavigate();

    const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultistepForm([
        { component: <PersonalForm/>, label: "Personal" },
        { component: <AboutYouForm/>, label: "About You" },
        { component: <PackageForm/>, label: "Package" }
    ]);

    const onFormSubmit = (data) => {
        if (!isLastStep) return next();

        data = { ...data, package: data.package._id };

        console.log(data);

        // createClient.mutate(data);
    };

    useEffect(() => {
        if (!createClient.isPending && createClient.isSuccess) {
            navigate("../clients");
        }

    }, [createClient.isPending, createClient.isSuccess]);

    return (
        <Box pt={6} pb={3}>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <Box mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="primary" borderRadius="lg"
                            coloredShadow="primary" className={"flex flex-row justify-center"}
                        >
                            <Typography variant="h5" color="white">Add Client</Typography>
                        </Box>
                        <Box pt={3} pb={3} >
                            <FormProvider {...methods}>
                                <form onSubmit={methods.handleSubmit(onFormSubmit)} noValidate>
                                    <Box mx={2} mt={3} py={3} px={2}
                                        borderRadius="lg" coloredShadow={"primary"}>
                                        <Stepper nonLinear activeStep={currentStepIndex} className={"mb-10"} sx={{
                                            mt: -6,
                                            px: 6
                                        }}>
                                            {steps.map(step =>
                                                <Step key={step.label}>
                                                    <StepLabel>
                                                        {step.label}
                                                    </StepLabel>
                                                </Step>
                                            )}
                                        </Stepper>
                                        {step}
                                        <Box className={"flex gap-5 p-5 justify-end"} >
                                            {createClient.isPending &&
                                              <CircularProgress/>}

                                            {!createClient.isPending &&
                                              <>
                                                  {!isFirstStep &&
                                                    <Button variant={"gradient"} color={"secondary"} onClick={back}>
                                                      Back
                                                    </Button>}
                                                  <Button variant={"gradient"} color={"primary"} type={"submit"}>
                                                      {isLastStep ? "Submit" : "Next"}
                                                  </Button>
                                              </>
                                            }
                                        </Box>
                                    </Box>
                                </form>
                            </FormProvider>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};
export default AddClientPage;
