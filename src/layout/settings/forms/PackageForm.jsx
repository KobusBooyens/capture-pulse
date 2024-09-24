import React from "react";
import { CircularProgress, Grid, ListItemAvatar } from "@mui/material";
import FormInputText from "../../../components/Input/FormInputText/FormInputText.jsx";
import ListItem from "@mui/material/ListItem";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import PropTypes from "prop-types";

const PackageForm = ({ isAdding }) => {
    return (
        <ListItem
            key={"add"}
            sx={{ p: 1 }}
            secondaryAction={
                <>
                    {isAdding ?
                        <CircularProgress color={"success"} size={30}/> :
                        <Tooltip placement={"top"} title={"Add"} arrow={false}>
                            <IconButton edge="end" aria-label="add" type={"submit"}>
                                <Icon color={"success"}>add</Icon>
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
            <ListItemText>
                <Grid container spacing={3}>
                    <Grid item xs={6} md={6} lg={6}>
                        <FormInputText
                            variant={"standard"}
                            key={"name"}
                            name={"name"}
                            label="Package Name"
                            placeholder="Enter Package Name"
                            disabled={isAdding}
                            required
                            rules={{ required: "Package Name is required" }}
                        />
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                        <FormInputText
                            variant={"standard"}
                            key={"amount"}
                            name={"amount"}
                            label="Amount"
                            type={"number"}
                            placeholder="Enter Amount"
                            disabled={isAdding}
                            required
                            rules={{ required: "Amount is required" }}
                        />
                    </Grid>
                </Grid>
            </ListItemText>
        </ListItem>

    );
};

PackageForm.propTypes = {
    isAdding: PropTypes.bool,
};

export default PackageForm;
