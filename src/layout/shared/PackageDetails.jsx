import React from "react";
import Box from "../../components/Box/Box.jsx";
import PropTypes from "prop-types";
import Typography from "../../components/Typography/Typography.jsx";

const PackageDetails = ({ name, goal }) =>
    <Box lineHeight={1} textAlign="left">
        <Typography display="block" variant="caption" color="text" fontWeight="medium">
            {name}
        </Typography>
        <Typography variant="caption">{goal}</Typography>
    </Box>;

PackageDetails.propTypes = {
    name: PropTypes.string,
    goal: PropTypes.string
};

export default PackageDetails;