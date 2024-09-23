import React, { useState } from "react";
import { Grid, ListItemAvatar, ListItemSecondaryAction, TextField } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import { FormProvider, useForm } from "react-hook-form";
import GoalForm from "../../forms/GoalForm.jsx";
import Box from "../../../../components/Box/Box.jsx";

const goalList = [
    { value: "Weight-loss", label: "Weight-loss" },
    { value: "Lean-bulk", label: "Lean-bulk" },
    { value: "Bodybuilding", label: "Bodybuilding" },
];

const Goals = () => {
    const methods = useForm();
    const [goals, setGoals] = useState(goalList);

    const onFormSubmit = (data) => {
        setGoals((prevState) => [...prevState, { label: data.goal, value: data.goal }]);
        methods.reset({});
    };

    const onDelete = (data) => {
        setGoals((prevState) => prevState.filter(r => r.label !== data.label));
    };

    return (
        <Box display={"flex"} justifyContent={"center"} px={10} py={5}>
            <Grid container justifyContent={"center"} spacing={2}>
                <Grid item xs={12} md={6}>
                    <List>
                        {goals.map((item) =>
                            <ListItem
                                key={item.value}
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
                                        <Icon>flag</Icon>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    secondary={item.label}
                                />
                            </ListItem>)}
                        <FormProvider {...methods} >
                            <form onSubmit={methods.handleSubmit(onFormSubmit)} noValidate>
                                <GoalForm/>
                            </form>

                        </FormProvider>
                    </List>
                </Grid>
            </Grid>
        </Box>
    );
};
export default Goals;
