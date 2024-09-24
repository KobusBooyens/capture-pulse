import React from "react";
import { CircularProgress, ListItemAvatar } from "@mui/material";
import FormInputText from "../../../components/Input/FormInputText/FormInputText.jsx";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import PropTypes from "prop-types";

const GoalForm = ({ isAdding }) => {
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
                        </Tooltip>}
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
                    variant={"standard"}
                    name={"name"}
                    label="New Goal"
                    placeholder="Enter Goal"
                    disabled={isAdding}
                    required
                    rules={{ required: "Goal is required" }}
                />

            </ListItemText>
        </ListItem>
    );
};

GoalForm.propTypes = {
    isAdding: PropTypes.bool,
};

export default GoalForm;
