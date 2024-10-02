import React, { useState } from "react";
import { Checkbox, Chip, Icon, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import Typography from "../../../components/Typography/Typography";
import Box from "../../../components/Box/Box";
import dayjs from "dayjs";

const TaskReminderListItem = ({ record, disableItem, onClickTaskReminder }) => {
    const [hovered, setHovered] = useState(false);
    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    return (
        <ListItem
            key={record._id}
            sx={{ mb: 1 }}
            disablePadding
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Tooltip title="Mark Completed" arrow={false} disabled>
                <ListItemButton 
                    role={undefined} 
                    onClick={() => onClickTaskReminder(record)} 
                    disabled={disableItem}
                >
                    <ListItemIcon>
                        { disableItem ? <Icon color="secondary">pending</Icon> :
                            hovered ? 
                                <Icon color="primary">check_circle</Icon>
                                : 
                                <Checkbox
                                    color="primary"
                                    edge="start"
                                    value={record.actioned}
                                    checked={record.actioned}
                                    tabIndex={-1}
                                    disableRipple
                                />
                        }
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography variant="body2">
                                {record.title}
                            </Typography>
                        }
                        secondary={
                            <Box display="flex" flexDirection="column">
                                <Typography variant="button" color="text">
                                    {record.description}
                                </Typography>
                                {record.dateTime && 
                            <Chip 
                                size="small"
                                sx={{ alignSelf: "flex-start" }} 
                                variant="outlined"
                                label={
                                    dayjs(record.dateTime).isToday()
                                        ? "Today"
                                        : dayjs(record.dateTime).isTomorrow()
                                            ? "Tomorrow"
                                            : dayjs(record.dateTime).format("ddd, MMM M")} 
                            />}
                            </Box>
                        }
                    />
                </ListItemButton> 
            </Tooltip>
        </ListItem>
    );
};

TaskReminderListItem.propTypes = {
    record: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        actioned: PropTypes.bool,
        dateTime: PropTypes.string
    }).isRequired,
    disableItem: PropTypes.bool.isRequired,
    onClickTaskReminder: PropTypes.func
};

export default TaskReminderListItem;