import React from "react";

import FormInputText from "../../../components/Input/FormInputText/FormInputText.jsx";
import PropTypes from "prop-types";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Box from "../../../components/Box/Box.jsx";

const SubscriptionForm = ({ disabled }) => {
    return (
        <Box display={"flex"} alignItems={"center"} gap={2}>
            <Tooltip
                title={"The subscription Code would have been provided by your administrator. " +
              "Please contact your administrator if you did not receive the code."}
                placement={"top"}>
                <Icon color={"primary"}>info</Icon>
            </Tooltip>
            <FormInputText
                variant={"standard"}
                key={"subscriptionCode"}
                name={"subscriptionCode"}
                label="Subscription Code"
                disabled={disabled}
                placeholder="Enter Subscription Code"
                required
                rules={{ required: "Subscription code is required" }}
                fullWidth
            />
        </Box>

    );
};

SubscriptionForm.propTypes = {
    disabled: PropTypes.bool
};

export default SubscriptionForm;
