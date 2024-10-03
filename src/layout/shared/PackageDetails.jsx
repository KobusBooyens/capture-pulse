import React from "react";
import Box from "../../components/Box/Box.jsx";
import PropTypes from "prop-types";
import Typography from "../../components/Typography/Typography.jsx";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

const PackageDetails = ({ name, goal, partnersDetail }) =>
    <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} height={"100%"}>
        { name && goal ?
            <>
                <Typography variant="caption" color="text" fontWeight="medium">
                    {name}
                    {partnersDetail &&
              <Tooltip title={
                  <Box color={"white"}>
                      {partnersDetail.map(p =>
                          <Typography key={p._id} display="block" color={"inherit"} variant={"body"}>
                              {p.name}
                          </Typography>
                      )}
                  </Box>} placement={"top"}>
                  <Icon fontSize="small" color="info" className={"-mb-1"}>people</Icon>
              </Tooltip>
                    }

                </Typography>
                <Typography variant="caption">{goal}</Typography>
            </> :
            <Typography variant="normal" color="text">-</Typography>
        }

    </Box>;

PackageDetails.propTypes = {
    name: PropTypes.string,
    goal: PropTypes.string,
    partnersDetail: PropTypes.node
};

export default PackageDetails;