import React from "react";
import Box from "../../components/Box/Box.jsx";
import Avatar from "../../components/Avatar/Avatar.jsx";
import Icon from "@mui/material/Icon";
import Typography from "../../components/Typography/Typography.jsx";
import PropTypes from "prop-types";

const ClientDetails = ({ name, surname, contactNumber, gender }) => {
    const avatarColor = gender === "Female" ? "#f75b95" : "#02b0f0";
    return (
        <Box display={"flex"} flexDirection={"row"} height={"100%"} alignItems={"center"}>
            <Avatar sx={{ bgcolor: gender && avatarColor }}>
                <Icon fontSize={gender ? "small" : "large"}>account_circle</Icon>
            </Avatar>
            <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} height={"100%"} marginLeft={1}>
                <Typography display="block" variant={gender ? "button" : "subtitle1"} fontWeight="medium">
                    {name} {surname}
                </Typography>
                <Typography variant={gender ?"caption" : "subtitle2"} >
                    {contactNumber}
                </Typography>
            </Box>
        </Box>

    );
};

ClientDetails.propTypes = {
    name: PropTypes.string,
    surname: PropTypes.string,
    contactNumber: PropTypes.string,
    gender: PropTypes.string,
};

export default ClientDetails;
