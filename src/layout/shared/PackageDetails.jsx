import React from "react";
import Box from "../../components/Box/Box.jsx";
import PropTypes from "prop-types";
import Typography from "../../components/Typography/Typography.jsx";
import Icon from "@mui/material/Icon";

const PackageDetails = ({ name, goal, partnersDetail, placeholder="-" }) => {
    return (
        <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} height={"100%"}>
            { name || goal ?
                <>
                    <Typography variant="caption" color="text" fontWeight="medium">
                        {name ? name :
                            <><Icon color={"warning"}>warning</Icon> Package</> }
                    </Typography>
                    <Typography variant="caption">{goal ? goal :
                        <><Icon color={"warning"}>warning</Icon> Goal</>}</Typography>
                </> :
                <Typography variant="normal" color="text">{placeholder}</Typography>
            }

        </Box>
    );
};

PackageDetails.propTypes = {
    name: PropTypes.string,
    goal: PropTypes.string,
    placeholder: PropTypes.string,
    partnersDetail: PropTypes.node
};

export default PackageDetails;