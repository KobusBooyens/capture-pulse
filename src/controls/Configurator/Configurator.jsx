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
import { ListItemAvatar } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import Button from "../../components/Button/Button.jsx";

function Configurator() {
    const [controller, dispatch] = useUISettingsController();
    const { openConfigurator, darkMode } = controller;
    const [disabled, setDisabled] = useState(false);
    const [hovered, setHovered] = useState(null); // Track which task is hovered

    useEffect(() => {
        function handleDisabled() {
            return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
        }

        window.addEventListener("resize", handleDisabled);
        handleDisabled();

        return () => window.removeEventListener("resize", handleDisabled);
    }, []);

    const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);

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
                <Box>
                    <Typography variant="h5">Tasks</Typography>
                    <Button variant={"text"} color={"info"}>Add a task</Button>
                    {/*<Typography variant="link" color="text" onClick={() => console.log("add task")}>*/}
                    {/*Add a task*/}
                    {/*</Typography>*/}
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
                        <ListItem sx={{ mb:1 }}>
                            <ListItemAvatar>
                                <Tooltip title="Mark completed" arrow>
                                    <Icon
                                        onMouseEnter={() => setHovered(0)}
                                        onMouseLeave={() => setHovered(null)}
                                        color={hovered === 0 ? "success" : "inherit"}
                                    >
                                        {hovered === 0 ? "checked" : "radio_button_unchecked"}
                                    </Icon>
                                </Tooltip>
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Typography variant={"body2"}>Update John Doe meal plan</Typography>}
                                secondary={<Typography variant={"button" } color="text">Jan 9, 2014</Typography>} />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Icon color="success">checked</Icon>
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Typography variant={"body2"}>Remove Avo for Mary</Typography>}
                                secondary={<Typography variant={"button" } color="text">Jan 9, 2014</Typography>}
                            />
                        </ListItem>
                    </List>
                </Box>
                <Divider />
                <Box mt={3} lineHeight={1}>
                    <Typography variant="h6">Team Tasks</Typography>
                    <Typography variant="button" color="text">
            Everyone in your team will be able to see these tasks
                    </Typography>
                    <Divider />
                    <ListItem sx={{ mb:1 }}>
                        <ListItemAvatar >
                            <Tooltip title="Mark completed" arrow>
                                <Icon
                                    onMouseEnter={() => setHovered(1)}
                                    onMouseLeave={() => setHovered(null)}
                                    color={hovered === 1 ? "success" : "inherit"}
                                >
                                    {hovered === 1 ? "checked" : "radio_button_unchecked"}
                                </Icon>
                            </Tooltip>
                        </ListItemAvatar>
                        <ListItemText
                            primary={<Typography variant={"body2"}>Update John Doe meal plan</Typography>}
                            secondary={<Typography variant={"button" } color="text">Jan 9, 2014</Typography>} />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Icon color="success">checked</Icon>
                        </ListItemAvatar>
                        <ListItemText
                            primary={<Typography variant={"body2"}>Remove Avo for Mary</Typography>}
                            secondary={<Typography variant={"button" } color="text">Jan 9, 2014</Typography>} />
                    </ListItem>
                </Box>
            </Box>
        </ConfiguratorRoot>
    );
}

export default Configurator;
