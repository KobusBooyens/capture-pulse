import React, { useState } from "react";
import { Grid, ListItemAvatar } from "@mui/material";
import Box from "../../../../components/Box/Box.jsx";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import { FormProvider, useForm } from "react-hook-form";
import GoalForm from "../../forms/GoalForm.jsx";
import PackageForm from "../../forms/PackageForm.jsx";

const subscriptionList = [
    { name: "1 Month", amount: "900" },
    { name: "3 Months", amount: "800" },
    { name: "6 Months", amount: "1200" },
    { name: "Couples", amount: "1500" },
];

const Packages = () => {

    const [subscriptions, setSubscription ] = useState(subscriptionList);

    const methods = useForm();

    const onFormSubmit = (data) => {
        setSubscription((prevState) => [...prevState, { name: data.name, amount: data.amount }]);
        methods.reset({});
    };

    const onDelete = (data) => {
        setSubscription((prevState) => prevState.filter(r => r.name !== data.name));
    };

    return (
        <Box display={"flex"} justifyContent={"center"} px={10} py={5}>
            <Grid container justifyContent={"center"} spacing={2}>
                <Grid item xs={12} md={6}>
                    <List>
                        {subscriptions.map((item) =>
                            <ListItem
                                key={item.name}
                                sx={{ p: 1 }}
                                secondaryAction={
                                    <>
                                        <Tooltip placement={"top"} title={"Delete"} arrow={false}>
                                            <IconButton edge="end" aria-label="delete" onClick={() => onDelete(item)}>
                                                <Icon color={"error"}>delete</Icon>
                                            </IconButton>
                                        </Tooltip>
                                    </>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <Icon>inventory_2</Icon>
                                    </Avatar>
                                </ListItemAvatar>
                                <Grid container spacing={3}>
                                    <Grid item xs={6} md={6} lg={6}>
                                        <ListItemText secondary={item.name} />
                                    </Grid>
                                    <Grid item xs={6} md={6} lg={6}>
                                        <ListItemText secondary={item.amount} />
                                    </Grid>
                                </Grid>

                            </ListItem>)}

                        <FormProvider {...methods} >
                            <form onSubmit={methods.handleSubmit(onFormSubmit)} noValidate>
                                <PackageForm/>
                            </form>

                        </FormProvider>
                    </List>
                </Grid>
            </Grid>
        </Box>
    );
};
export default Packages;
