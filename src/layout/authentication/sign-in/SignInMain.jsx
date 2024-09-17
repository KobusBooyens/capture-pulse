import React, { useState } from "react";
import Typography from "../../../components/Typography/Typography.jsx";
import Box from "../../../components/Box/Box.jsx";
import Card from "@mui/material/Card";
import bgImage from "../../../assets/images/bg_sign_in.jpg";
import SignInLayout from "../layouts/SignInLayout.jsx";
import { FormProvider, useForm } from "react-hook-form";
import Button from "../../../components/Button/Button.jsx";
import { Link, useNavigate } from "react-router-dom";
import SignInForm from "../forms/SignInForm.jsx";
import useAuthSignIn from "../../../api/auth/useAuthSignIn.js";

export const SignInMain = () => {
    const registerFormMethods = useForm();
    const authSignIn = useAuthSignIn();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const onSignInSubmit = (data) => {
        authSignIn.mutate({ data }, {
            onSuccess: () => {
                setError("");
                navigate("/dashboard");
            },
            onError: (error) => {
                setError(error.response.data.message);
            }
        });
    };

    return (
        <SignInLayout image={bgImage}>
            <Box mt={-10}>
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
                        Enter your details to sign-in
                        </Typography>
                    </Box>

                    <FormProvider {...registerFormMethods}>
                        <form onSubmit={registerFormMethods.handleSubmit(onSignInSubmit)} noValidate>
                            <SignInForm />
                            <Box textAlign="center" mt={2}>
                                <Button
                                    variant="gradient"
                                    color={"primary"}
                                    type="submit"
                                    disabled={authSignIn.isPending}
                                    fullWidth
                                >
                                    {authSignIn.isPending ? "Signing-in" : "Sign-in"}
                                </Button>

                                {error && <Typography variant="button" color="error" m={1}>
                                    {error}
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
                        <Typography variant="button">Don&apos;t have an account?</Typography>
                        <Typography component={Link}
                            to="/authentication/sign-up"
                            variant="button"
                            color="info"
                            fontWeight="medium"
                            textGradient
                        >
                            Sign Up
                        </Typography>
                    </Box>
                </Card>
            </Box>

        </SignInLayout>
    );
};
