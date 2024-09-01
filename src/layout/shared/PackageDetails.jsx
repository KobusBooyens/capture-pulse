import React from "react";
import Box from "../../components/Box/Box.jsx";
import PropTypes from "prop-types";
import Typography from "../../components/Typography/Typography.jsx";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

const PackageDetails = ({ name, goal, partnersDetail }) =>
    <Box lineHeight={1} textAlign="left">
        <Typography display="block" variant="caption" color="text" fontWeight="medium">
            {name}
            {partnersDetail &&
              <Tooltip title={
                  <Box display="flex" flexDirection="column" color={"white"}>
                      {partnersDetail.map(p => 
                          <Typography key={p._id} display="block" color={"inherit"} variant={"body"}>
                              {p.name}
                          </Typography>
                      )}
                  </Box>} placement={"top"}>
                  <Icon fontSize="small" color="info">person</Icon>
              </Tooltip>
            }

        </Typography>
        <Typography variant="caption">{goal}</Typography>
    </Box>;

PackageDetails.propTypes = {
    name: PropTypes.string,
    goal: PropTypes.string,
    partnersDetail: PropTypes.node
};

export default PackageDetails;