import React from "react";
import Box from "../../components/Box/Box.jsx";
import Typography from "../../components/Typography/Typography.jsx";
import PropTypes from "prop-types";

const CheckinDetails = ({ lastCheckIn, checkinCount, totalCheckins }) =>
    <Box lineHeight={1} textAlign="left">
        <Typography display="block" variant="caption" color="text" fontWeight="medium">
            {lastCheckIn}
        </Typography>
        <Typography variant="caption">{checkinCount}/{totalCheckins}</Typography>
    </Box>;

CheckinDetails.propTypes = {
    lastCheckIn: PropTypes.string,
    checkinCount: PropTypes.number,
    totalCheckins: PropTypes.number,
};
export default CheckinDetails;
