import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import SubscriptionForm from "../../forms/SubscriptionForm.jsx";
import Box from "../../../../components/Box/Box.jsx";

const Subscription = () => {
    const methods = useForm();

    const onCancel = () => {
        methods.reset({});
    };

    const onFormSubmit = (data) => {
        console.log(data);
    };

    return (

        <FormProvider {...methods}>
            <Box display={"flex"} justifyContent={"center"} flexDirection={"column"} p={5}>
                <form onSubmit={methods.handleSubmit(onFormSubmit)} noValidate>
                    <SubscriptionForm onCancel={onCancel} />
                </form>
            </Box>
        </FormProvider>

    );
};
export default Subscription;
