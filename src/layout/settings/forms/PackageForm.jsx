import React from "react";
import { Grid, ListItemAvatar } from "@mui/material";
import FormInputText from "../../../components/Input/FormInputText/FormInputText.jsx";
import ListItem from "@mui/material/ListItem";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";

const PackageForm = () => {
    return (
        <ListItem
            key={"add"}
            sx={{ p: 1 }}
            secondaryAction={
                <>
                    <Tooltip placement={"top"} title={"Add"} arrow={false}>
                        <IconButton edge="end" aria-label="add" type={"submit"}>
                            <Icon color={"success"}>add</Icon>
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
            <ListItemText>
                <Grid container spacing={3}>
                    <Grid item xs={6} md={6} lg={6}>
                        <FormInputText
                            variant={"standard"}
                            key={"name"}
                            name={"name"}
                            label="Package Name"
                            placeholder="Enter Package Name"
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
                            required
                            rules={{ required: "Amount is required" }}
                        />
                    </Grid>
                </Grid>

            </ListItemText>
        </ListItem>

    );
};
export default PackageForm;
