import React from "react";
import { Grid, ListItemAvatar } from "@mui/material";
import FormInputText from "../../../components/Input/FormInputText/FormInputText.jsx";
import Button from "../../../components/Button/Button.jsx";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";

const GoalForm = () => {
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
                    <Icon>flag</Icon>
                </Avatar>
            </ListItemAvatar>
            <ListItemText>
                <FormInputText
                    name={"goal"}
                    variant={"standard"}
                    label="New Goal"
                    placeholder="Enter Goal"
                    required
                    rules={{ required: "Goal is required" }}
                />

            </ListItemText>
        </ListItem>
    );
};
export default GoalForm;
