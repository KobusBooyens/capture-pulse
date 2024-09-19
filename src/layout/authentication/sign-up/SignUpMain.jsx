import React, { useState } from "react";
import Typography from "../../../components/Typography/Typography.jsx";
import Box from "../../../components/Box/Box.jsx";
import Card from "@mui/material/Card";
import SignUpForm from "../forms/SignUpForm.jsx";
import { FormProvider, useForm } from "react-hook-form";
import SubscriptionForm from "../forms/SubscriptionForm.jsx";
import Button from "../../../components/Button/Button.jsx";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import SignUpLayout from "../layouts/SignUpLayout.jsx";
import useVerifySubscription from "../../../api/subscriptions/useVerifySubscription.js";
import useCreateUser from "../../../api/users/useCreateUser.js";

const SignUpMain = () => {
    const [isVerified, setIsVerified] = useState(false);
    const [subscriptionButtonText, setSubscriptionButtonText] = useState("Verify Subscription");
    const [signUpError, setSignUpError] = useState({ action: null, message: null });

    const registerFormMethods = useForm();
    const verifySubFormMethods = useForm();
    const verifySubscription = useVerifySubscription();
    const createUser = useCreateUser(false, false);

    const onSubVerificationSubmit = (data) => {
        const { subscriptionCode } = data;
        verifySubscription.mutate(subscriptionCode, {
            onSuccess: (success) => {
                setSubscriptionButtonText(success.name);
                setIsVerified(true);
            },
            onError: (error) => {
                setIsVerified(false);
                setSubscriptionButtonText("Verify Subscription");
                verifySubFormMethods.setError("subscriptionCode", { message: error.response.data });

            }
        });
    };

    const onRegisterSubmit = (data) => {

        if (registerFormMethods.getValues("password") !== registerFormMethods.getValues("confirmPassword")) {
            registerFormMethods.setError("confirmPassword", {
                message: "Password do not match. Please note that the password is case sensitive."
            });
            return;
        }

        const dataToSubmit = {
            ...data,
            subscriptionCode: verifySubFormMethods.getValues("subscriptionCode"),
            isSubscriptionOwner: true,
            activateSubscription: true

        };

        createUser.mutate(dataToSubmit, {
            onSuccess: () => {
                console.log("Signing in and redirecting to page");  
            },
            onError: (error) => {
                if (error.response.data.field) {
                    registerFormMethods.setError(error.response.data.field, {
                        message: error.response.data.message
                    });
                } else if (error.response.data.action === "signUpError") {
                    setSignUpError({
                        action: error.response.data.action,
                        message: error.response.data.message
                    });
                } else {
                    setSignUpError({
                        action: null,
                        message: error.response.data?.message ?? error.response.data
                    });
                }
            }
        });
    };

    return (
        <SignUpLayout>
            <Box mt={-10}
                // sx={{
                //     display: "flex",
                //     justifyContent: "center",
                //     alignItems: "center",
                //     minHeight: "100vh",
                // }}
            >
                <Card sx={{ padding: 5 }}>
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
                                    disabled={createUser.isPending || !!isVerified}
                                    type="submit">
                                    {subscriptionButtonText}
                                </Button>
                            </Box>
                        </form>
                    </FormProvider>

                    <Divider sx={{ my: 4 }} />

                    <FormProvider {...registerFormMethods}>
                        <form onSubmit={registerFormMethods.handleSubmit(onRegisterSubmit)} noValidate>
                            <SignUpForm disabled={!isVerified || signUpError.action}/>
                            <Box textAlign="center" mt={2}>
                                <Button
                                    variant="gradient"
                                    color={signUpError.action ? "error" : "primary"}
                                    type="submit"
                                    fullWidth
                                    disabled={signUpError.action || createUser.isPending || !isVerified}
                                >
                                    {createUser.isPending ? "Registering user..." : "Register"}
                                </Button>

                                {signUpError.message && <Typography variant="button" color="error" m={1}>
                                    {signUpError.message}
                                </Typography>
                                }

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
        </SignUpLayout>

    );
};

export default SignUpMain;