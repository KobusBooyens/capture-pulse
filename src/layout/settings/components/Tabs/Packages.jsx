import React, { useEffect, useState } from "react";
import { CircularProgress, Grid, ListItemAvatar, Skeleton } from "@mui/material";
import Box from "../../../../components/Box/Box.jsx";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import { FormProvider, useForm } from "react-hook-form";
import PackageForm from "../../forms/PackageForm.jsx";
import { usePackages } from "../../../../api/packages/usePackageFetch.js";
import { useCreatePackage, useDeletePackage } from "../../../../api/packages/usePackageMutation.js";
import PropTypes from "prop-types";

const Packages = () => {
    const packages = usePackages();
    const createPackage = useCreatePackage();
    const deletePackage = useDeletePackage();
    const [deletingId, setDeletingId] = useState(null);

    const methods = useForm();

    useEffect(() => {
        methods.reset({ ...packages.data });
    },[packages.data]);

    const onFormSubmit = (data) => {
        createPackage.mutate({ name: data.name, amount: parseInt(data.amount) });
    };

    const onDelete = (data) => {
        setDeletingId(data._id);
        deletePackage.mutate({ id: data._id }, {
            onSettled: () => {
                setDeletingId(null);
            }
        });
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
                        <Grid item xs={6} md={6} lg={6}>
                            <Skeleton variant="text" width="60%" />
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
                        key={item.name}
                        sx={{ p: 1 }}
                        secondaryAction={
                            <>
                                {deletingId === item._id ?
                                    <CircularProgress color={"error"} size={30} />
                                    :
                                    <Tooltip placement={"top"} title={"Delete"} arrow={false}>
                                        <IconButton edge="end"
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
            </>

        );
    };

    DataView.propTypes = {
        data: PropTypes.array,
    };

    return (
        <Box display={"flex"} justifyContent={"center"} px={10} py={5}>
            <Grid container justifyContent={"center"} spacing={2}>
                <Grid item xs={12} md={6}>
                    <List>
                        {packages.isLoading ?
                            <SkeletonView/> :
                            <DataView data={packages.data}/>
                        }

                        <FormProvider {...methods} >
                            <form onSubmit={methods.handleSubmit(onFormSubmit)} noValidate>
                                <PackageForm
                                    isAdding={createPackage.isPending}
                                />
                            </form>

                        </FormProvider>
                    </List>
                </Grid>
            </Grid>
        </Box>
    );
};
export default Packages;
