import { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip"; // Import Tooltip
import {
    useUISettingsController,
    setOpenConfigurator,
} from "../../context/UISettingsProvider.jsx";
import ConfiguratorRoot from "./ConfiguratorRoot.js";
import Box from "../../components/Box/Box.jsx";
import Typography from "../../components/Typography/Typography.jsx";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { CircularProgress, ListItemAvatar } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";
import { FormProvider, useForm } from "react-hook-form";
import TaskForm from "./forms/TaskForm.jsx";
import { useGetAllTaskReminders } from "../../api/taskReminders/useTaskReminderFetch.js";
import { useTaskReminderCreate } from "../../api/taskReminders/useTaskReminderMutation.js";
import UserForm from "../../layout/users/forms/UserForm.jsx";
import PropTypes from "prop-types";

function Configurator() {
    const [controller, dispatch] = useUISettingsController();
    const { openConfigurator, darkMode } = controller;
    const [disabled, setDisabled] = useState(false);
    const [hovered, setHovered] = useState({ id: null, show: false });
    const [showTaskForm, setShowTaskForm] = useState(false);
    const methods = useForm();

    const taskReminders = useGetAllTaskReminders();
    const createTaskReminder = useTaskReminderCreate(true, false);

    useEffect(() => {
        function handleDisabled() {
            return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
        }

        window.addEventListener("resize", handleDisabled);
        handleDisabled();

        return () => window.removeEventListener("resize", handleDisabled);
    }, []);

    const handleCloseConfigurator = () => {
        setOpenConfigurator(dispatch, false);
        setShowTaskForm(false);
        methods.reset({});
    };

    const onFormSubmit = (data) => {
        createTaskReminder.mutate({ ...data }, {
            onSuccess: () => {
                setShowTaskForm(false);
                methods.reset({});
            } });
    };

    const handleAddTask = () => {
        methods.reset({});
        setShowTaskForm(prevState => !prevState);
    };

    const AddTaskForm = () =>
        <FormProvider {...methods} >
            <form onSubmit={methods.handleSubmit(onFormSubmit)} noValidate>
                <TaskForm isAdding={createTaskReminder.isPending} onCancel={handleAddTask} />
            </form>
        </FormProvider>;

    const TaskReminderListItem = ({ record }) => {
        const [hovered, setHovered] = useState(false);

        return (
            <ListItem
                key={record._id}
                sx={{ mb: 1 }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <ListItemAvatar>
                    <Tooltip title="Mark completed" arrow={false}>
                        <span>
                            <Icon color={hovered ? "success" : "inherit"}>
                                {hovered ? "checked" : "radio_button_unchecked"}
                            </Icon>
                        </span>
                    </Tooltip>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Typography variant="body2">
                            {record.title}
                        </Typography>
                    }
                    secondary={
                        <Typography variant="button" color="text">
                            {record.description}
                        </Typography>
                    }
                />
            </ListItem>
        );
    };

    TaskReminderListItem.propTypes = {
        record: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            date: PropTypes.string, // Optional or required depending on your needs
        }).isRequired,
    };

    const myTasks = () => {
        if (taskReminders.isPending) {
            return <CircularProgress/>;
        } else if (taskReminders.data.myTaskReminders &&
          taskReminders.data.myTaskReminders.length > 0) {
            return (
                taskReminders.data.myTaskReminders.map(record =>
                    <TaskReminderListItem key={record._id} record={record}/>)
            );
        } 
        return <Typography variant={"button"}>No task/reminders have been created yet</Typography>;
    };

    const teamTasks = () => {
        if (taskReminders.isPending) {
            return <CircularProgress/>;
        } else if (taskReminders.data.teamTaskReminders &&
      taskReminders.data.teamTaskReminders.length > 0) {
            return (
                taskReminders.data.teamTaskReminders.map(record =>
                    <TaskReminderListItem key={record._id} record={record}/>)
            );
        }
        return <Typography variant={"button"}>No task/reminders have been created yet</Typography>;
    };

    return (
        <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="baseline"
                pt={4}
                pb={0.5}
                px={3}
            >
                <Box display={"flex"} flexDirection={"column"}>
                    <Typography variant="h5">Tasks / Reminders</Typography>
                    <Link
                        href="#"
                        underline="hover"
                        color={"secondary"}
                        component="button"
                        variant="body2"
                        onClick={handleAddTask}>
                      Add a task or reminder
                    </Link>
                    {showTaskForm && <AddTaskForm/>}
                </Box>

                <Icon
                    sx={({ typography: { size }, palette: { dark, white } }) => ({
                        fontSize: `${size.lg} !important`,
                        color: darkMode ? white.main : dark.main,
                        stroke: "currentColor",
                        strokeWidth: "2px",
                        cursor: "pointer",
                        transform: "translateY(5px)",
                    })}
                    onClick={handleCloseConfigurator}
                >
          close
                </Icon>
            </Box>
            <Divider />
            <Box pt={0.5} pb={3} px={3}>
                <Box>
                    <Typography variant="h6">My Tasks</Typography>
                    <Typography variant="button" color="text">
            Only you are able to see these tasks
                    </Typography>
                    <Divider />
                    <List>
                        {myTasks()}
                    </List>
                </Box>
                <Divider />
                <Box mt={3} lineHeight={1}>
                    <Typography variant="h6">Team Tasks</Typography>
                    <Typography variant="button" color="text">
            Everyone in your team will be able to see these tasks
                    </Typography>
                    <Divider />
                    {teamTasks()}
                </Box>
            </Box>
        </ConfiguratorRoot>
    );
}

export default Configurator;
