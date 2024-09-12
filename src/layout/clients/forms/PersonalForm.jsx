import React from "react";
import FormInputText from "../../../components/Input/FormInputText/FormInputText.jsx";
import { Grid } from "@mui/material";
import FormInputDate from "../../../components/Input/FormInputDate/FormInputDate.jsx";
import FormInputDropdown from "../../../components/Input/FormInputDropdown/FormInputDropdown.jsx";
import genderOptions from "../../../data/genderOptions.js";
import PropTypes from "prop-types";

const PersonalForm = ({ addPartner= false }) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <FormInputText
                    key={addPartner ? "partnerFirstName" : "firstName"}
                    name={addPartner ? "partnerFirstName" : "firstName"}
                    label="First Name"
                    placeholder="Enter First Name"
                    required
                    rules={{ required: "First Name is required" }}
                    fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormInputText
                    key={addPartner ? "partnerLastName" : "lastName"}
                    name={addPartner ? "partnerLastName" : "lastName"}
                    label="Last Name"
                    placeholder="Enter Last Name"
                    required
                    rules={{ required: "Last Name is required" }}
                    fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormInputDate
                    key={addPartner ? "partnerDob" : "dob"}
                    name={addPartner ? "partnerDob" : "dob"}
                    label={"Date of birth"}
                    fullWidth
                    required
                    rules={{ required: "Date Of Birth is required" }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormInputDropdown
                    key={addPartner ? "partnerGender" : "gender"}
                    name={addPartner ? "partnerGender" : "gender"}
                    label="Gender"
                    placeholder="Select Gender"
                    options={genderOptions}
                    fullWidth
                    required
                    rules={{ required: "Gender is required" }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormInputText
                    key={addPartner ? "partnerEmail" : "email"}
                    name={addPartner ? "partnerEmail" : "email"}
                    label="Email"
                    placeholder="Enter Email"
                    required
                    type={"email"}
                    rules={{ required: "Email is required" }}
                    fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormInputText
                    key={addPartner ? "partnerContactNumber" : "contactNumber"}
                    name={addPartner ? "partnerContactNumber" : "contactNumber"}
                    label="Contact Number"
                    placeholder="Enter Contact Number"
                    fullWidth
                    required
                    rules={{
                        required: "Contact number is required",
                        pattern: { value: /^\d+$/, message: "Contact number must be digits only" }
                    }}
                />
            </Grid>
        </Grid>

    );
};

PersonalForm.propTypes = {
    addPartner: PropTypes.bool
};

export default PersonalForm;
