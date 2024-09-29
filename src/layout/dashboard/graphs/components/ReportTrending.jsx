import React from "react";
import Typography from "../../../../components/Typography/Typography.jsx";
import Box from "../../../../components/Box/Box.jsx";
import Icon from "@mui/material/Icon";
import PropTypes from "prop-types";

const ReportTrending = ({ totalUp, totalDown }) => {
    return (
        <Box display="flex" width={"100%"} justifyContent={"center"} gap={5}>
            <Typography color={totalUp === 0 ? "secondary" : "success"} variant="body2">
                <Box display={"flex"} flexDirection={"row"} gap={1} color={"inherit"}>
                    <Icon>{ totalUp === 0 ? "trending_flat" : "trending_up" }</Icon>
                    {`Total New (+${totalUp})`}
                </Box>

            </Typography>
            <Typography color={totalDown === 0 ? "standard" : "error"} variant="body2">
                <Box display={"flex"} flexDirection={"row"} gap={1} color={"inherit"}>
                    <Icon>{totalDown === 0 ? "trending_flat" : "trending_down"}</Icon>
                    {`Total Left ${totalDown === 0 ? " (Zero)" : "(-" + totalDown + ")"}`}
                </Box>
            </Typography>
        </Box>
    );
};

ReportTrending.propTypes = {
    totalUp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    totalDown: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
export default ReportTrending;
