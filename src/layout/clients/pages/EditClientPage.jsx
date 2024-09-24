import React, { useEffect } from "react";
import useMultistepForm from "../../../hooks/useMultistepForm.js";
import PersonalForm from "../forms/PersonalForm.jsx";
import AboutYouForm from "../forms/AboutYouForm.jsx";
import PackageForm from "../forms/PackageForm.jsx";
import { useClient } from "../../../api/clients/useClientFetch.js";
import { useEditClient } from "../../../api/clients/useClientMutation.js";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import Box from "../../../components/Box/Box.jsx";
import { CircularProgress, Grid, Step, StepLabel, Stepper } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "../../../components/Typography/Typography.jsx";
import Button from "../../../components/Button/Button.jsx";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

const EditClientPage = () => {
    const user = useClient();
    const editUser = useEditClient();
    const navigate = useNavigate();
    const methods = useForm();

    useEffect(() => {
        methods.reset(user.data);
    }, [user.data]);

    const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultistepForm([
        { component: <PersonalForm/>, label: "Personal" },
        { component: <AboutYouForm/>, label: "About You" },
        { component: <PackageForm/>, label: "Package" }
    ]);

    const onFormSubmit = (data) => {
        if (!isLastStep) return next();
        editUser.mutate({
            id: user.data._id,
            updatedData: {
                ...data,
                weight: data.weight.toString(),
                length: data.length.toString(),
                amount: data.amount.toString(),
            }
        });
    };

    useEffect(() => {
        if (!editUser.isPending && editUser.isSuccess) {
            navigate("../clients");
        }
    }, [editUser.isPending, editUser.isSuccess]);

    return (
        <Box pt={6} pb={3}>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <Box mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="primary" borderRadius="lg"
                            coloredShadow="primary" className={"flex flex-row justify-center gap-3"}
                        >
                            <Typography variant="h5" color="white">
                                Update Client
                            </Typography>
                            {user.data?.packagePartners && <Tooltip title={
                                <Box display="flex" flexDirection="column" color={"white"}>
                                    {user.data?.packagePartners?.map(p =>
                                        <Typography key={p._id} display="block" color={"inherit"} variant={"body"}>
                                            {p.name}
                                        </Typography>
                                    )}
                                </Box>} placement={"top"}>
                                <Icon fontSize="medium" color="info">people</Icon>
                            </Tooltip>}

                        </Box>
                        <Box pt={3} pb={3} >
                            <FormProvider {...methods}>
                                <form onSubmit={methods.handleSubmit(onFormSubmit)} noValidate>
                                    <Box mx={2} mt={3} py={3} px={2}
                                        borderRadius="lg" coloredShadow={"primary"}>
                                        <Stepper nonLinear activeStep={currentStepIndex} className={"mb-10"}
                                            sx={{ mt: -6, px: 6 }}
                                        >
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
                                            {editUser.isPending &&
                                            <CircularProgress />}

                                            {!editUser.isPending &&
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
export default EditClientPage;
