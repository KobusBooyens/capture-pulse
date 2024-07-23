import React from "react";
import Box from "../../components/Box/Box.jsx";
import Avatar from "../../components/Avatar/Avatar.jsx";
import Icon from "@mui/material/Icon";
import Typography from "../../components/Typography/Typography.jsx";
import PropTypes from "prop-types";

const ClientDetails = ({ name, surname, contactNumber, gender }) => {
    const avatarColor = gender === "Female" ? "#f75b95" : "#02b0f0";
    return (
        <Box display="flex" alignItems="center" lineHeight={1}>
            <Avatar sx={{ bgcolor: gender && avatarColor }}>
                <Icon fontSize={"small"}>account_circle</Icon>
            </Avatar>
            <Box ml={2} lineHeight={1}>
                <Typography display="block" variant="button" fontWeight="medium">
                    {name} {surname}
                </Typography>
                <Typography variant="caption" >
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
