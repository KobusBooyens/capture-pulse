import React from "react";

import FormInputText from "../../../../components/Input/FormInputText/FormInputText.jsx";
import PropTypes from "prop-types";

const SubscriptionForm = ({ disabled }) => {
    return (
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

    );
};

SubscriptionForm.propTypes = {
    disabled: PropTypes.bool
};

export default SubscriptionForm;
