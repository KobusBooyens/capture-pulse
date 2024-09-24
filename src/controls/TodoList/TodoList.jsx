import React from "react";
import Box from "../../components/Box/Box.jsx";
import Icon from "@mui/material/Icon";
import { useUISettingsController, setOpenConfigurator } from "../../context/UISettingsProvider.jsx";

const TodoList = () => {
    const [controller, dispatch] = useUISettingsController();
    const { openConfigurator } = controller;

    const handleTodoOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  
    return (
        <Box display="flex"
            justifyContent="center"
            alignItems="center"
            width="3.25rem"
            height="3.25rem"
            bgColor="white"
            shadow="sm"
            borderRadius="50%"
            position="fixed"
            right="2rem"
            bottom="2rem"
            zIndex={99}
            color="dark"
            sx={{ cursor: "pointer" }}
            onClick={handleTodoOpen}
        >
            <Icon fontSize="small" color="inherit">
        edit
            </Icon>
        </Box>
    );
};
export default TodoList;
