import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import SubscriptionForm from "../../forms/SubscriptionForm.jsx";
import Box from "../../../../components/Box/Box.jsx";
import { useGetSubscription } from "../../../../api/subscriptions/useSubscriptionFetch.js";
import { useUpdateSubscription } from "../../../../api/subscriptions/useSubscriptionMutate.js";

const Subscription = () => {
    const methods = useForm();
    const subscription = useGetSubscription();
    const updateSubscription = useUpdateSubscription();

    useEffect(() => {
        methods.reset({ ...subscription.data });
    }, [subscription.data]);

    const onCancel = () => {
        methods.reset({});
    };

    const onFormSubmit = (data) => {
        console.log(data);
        updateSubscription.mutate({ name: data.name, currency: data.currency });
    };

    return (
        <FormProvider {...methods}>
            <Box display={"flex"} justifyContent={"center"} flexDirection={"column"} px={10} py={5}>
                <form onSubmit={methods.handleSubmit(onFormSubmit)} noValidate>
                    <SubscriptionForm
                        isUpdating={updateSubscription.isPending}
                        isFetching={subscription.isLoading}
                        onCancel={onCancel}
                    />
                </form>
            </Box>
        </FormProvider>
    );
};

export default Subscription;
