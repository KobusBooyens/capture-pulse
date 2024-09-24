import React, { useState } from "react";
import { CircularProgress, Grid, ListItemAvatar, ListItemSecondaryAction, Skeleton, TextField } from "@mui/material";
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
import { useGoals } from "../../../../api/goals/useGoalFetch.js";
import { useCreateGoal, useDeleteGoal } from "../../../../api/goals/useGoalMutation.js";

const Goals = () => {
    const methods = useForm();
    const goals = useGoals();
    const addGoals = useCreateGoal();
    const deleteGoals = useDeleteGoal();
    const [deletingId, setDeletingId] = useState(null);

    const onFormSubmit = (data) => {
        addGoals.mutate({ ...data }, {
            onSuccess: () => {
                methods.reset({});
            } });
    };

    const onDelete = (data) => {
        setDeletingId(data._id);
        deleteGoals.mutate({ id: data._id }, {
            onSettled: () => {
                setDeletingId(null);
            } });
    };

    const SkeletonView = () => {
        return (
            Array.from(new Array(5)).map((_, index) =>
                <ListItem key={index} sx={{ p: 1 }}>
                    <ListItemAvatar>
                        <Skeleton variant="circular" width={40} height={40} />
                    </ListItemAvatar>
                    <Grid container spacing={3}>
                        <Grid item xs={6} md={6} lg={6}>
                            <Skeleton variant="text" width="80%" />
                        </Grid>
                    </Grid>
                    <Skeleton variant="rectangular" width={30} height={30} />
                </ListItem>
            )
        );
    };

    const DataView = ({ data }) => {
        return (
            <>
                {data.map((item) =>
                    <ListItem
                        key={item.value}
                        sx={{ p: 1 }}
                        secondaryAction={
                            <>
                                {deletingId === item._id ?
                                    <CircularProgress color={"error"} size={30} /> :
                                    <Tooltip placement={"top"} title={"Delete"} arrow={false}>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => onDelete(item)}>
                                            <Icon color={"error"}>delete</Icon>
                                        </IconButton>
                                    </Tooltip>
                                }
                            </>
                        }
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <Icon>flag</Icon>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            secondary={item.name}
                        />
                    </ListItem>)}
            </>
        );
    };

    return (
        <Box display={"flex"} justifyContent={"center"} px={10} py={5}>
            <Grid container justifyContent={"center"} spacing={2}>
                <Grid item xs={12} md={6}>
                    <List>
                        {goals.isLoading ? <SkeletonView/> : <DataView data={goals.data}/> }

                        <FormProvider {...methods} >
                            <form onSubmit={methods.handleSubmit(onFormSubmit)} noValidate>
                                <GoalForm isAdding={addGoals.isPending}/>
                            </form>

                        </FormProvider>
                    </List>
                </Grid>
            </Grid>
        </Box>
    );
};
export default Goals;
