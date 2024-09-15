import React, { useState } from "react";
import Typography from "../../../components/Typography/Typography.jsx";
import Box from "../../../components/Box/Box.jsx";
import Card from "@mui/material/Card";
import RegisterForm from "./forms/RegisterForm.jsx";
import { FormProvider, useForm } from "react-hook-form";
import SubscriptionForm from "./forms/SubscriptionForm.jsx";
import Button from "../../../components/Button/Button.jsx";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";

export const SignUpMain = () => {
    const [isVerified, setIsVerified] = useState(false); // State to track if subscription code is verified
    const registerFormMethods = useForm();
    const verifySubFormMethods = useForm();

    const onSubVerificationSubmit = (data) => {
        console.log("onSubVerificationSubmit", data);
        const { subscriptionCode } = data;
        if (subscriptionCode === "VALID_CODE") {
            setIsVerified(true);
        } else {
            setIsVerified(false);
            verifySubFormMethods.setError("subscriptionCode", { message: "Invalid code" });
        }
    };

    const onRegisterSubmit = (data) => {
        console.log("Registration Data:", data);
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh"
            }}
        >
            <Card sx={{ width: "100%", maxWidth: 500, padding: 5 }}>
                <Box
                    variant="gradient"
                    bgColor="primary"
                    borderRadius="lg"
                    coloredShadow="dark"
                    mx={2}
                    mt={-8}
                    p={3}
                    mb={2}
                    textAlign="center"
                >
                    <Typography variant="h4" fontWeight="medium" color="white" mt={1}>
                      Welcome to Capture Pulse
                    </Typography>
                    <Typography display="block" variant="button" color="white" my={1}>
                      Enter your details to register
                    </Typography>
                </Box>

                <FormProvider {...verifySubFormMethods}>
                    <form onSubmit={verifySubFormMethods.handleSubmit(onSubVerificationSubmit)} noValidate>
                        <SubscriptionForm disabled={isVerified} />
                        <Box textAlign="center" mt={2}>
                            <Button
                                variant="gradient"
                                color="primary"
                                disabled={!!isVerified}
                                type="submit">
                                {!isVerified ? "Verify Subscription" : "Welcome Fitness Co."}
                            </Button>
                        </Box>
                    </form>
                </FormProvider>

                <Divider sx={{ my: 4 }} />

                <FormProvider {...registerFormMethods}>
                    <form onSubmit={registerFormMethods.handleSubmit(onRegisterSubmit)} noValidate>
                        <RegisterForm disabled={!isVerified}/>
                        <Box textAlign="center" mt={2}>
                            <Button
                                variant="gradient"
                                color="primary"
                                type="submit"
                                fullWidth
                                disabled={!isVerified}
                            >
                              Register
                            </Button>
                        </Box>
                    </form>
                </FormProvider>
                <Box 
                    mt={3} mb={3}
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"center"} gap={1}>
                    <Typography variant="button">Already have an account?</Typography>
                    <Typography component={Link}
                        to="/authentication/sign-in"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                    >
                        Sign In

                    </Typography>
                </Box>

            </Card>
        </Box>
    );
};
