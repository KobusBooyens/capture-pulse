import React from "react";
import { useParams } from "react-router-dom";
import FormInputText from "../../../components/Input/FormInputText/FormInputText.jsx";
import { Grid } from "@mui/material";
import FormInputDate from "../../../components/Input/FormInputDate/FormInputDate.jsx";
import FormInputDropdown from "../../../components/Input/FormInputDropdown/FormInputDropdown.jsx";
import genderOptions from "../../../data/genderOptions.js";
import PropTypes from "prop-types";

const PersonalForm = ({ addPartner= false }) => {
    const { id } = useParams();

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <FormInputText
                    key={addPartner ? "partner.firstName" : "firstName"}
                    name={addPartner ? "partner.firstName" : "firstName"}
                    label="First Name"
                    placeholder="Enter First Name"
                    required
                    rules={{ required: "First Name is required" }}
                    fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormInputText
                    key={addPartner ? "partner.lastName" :"lastName"}
                    name={addPartner ? "partner.lastName" :"lastName"}
                    label="Last Name"
                    placeholder="Enter Last Name"
                    required
                    rules={{ required: "Last Name is required" }}
                    fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormInputDate
                    key={addPartner ? "partner.dob" : "dob"}
                    name={addPartner ? "partner.dob" : "dob"}
                    label={"Date of birth"}
                    fullWidth
                    required
                    rules={{ required: "Date Of Birth is required" }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormInputDropdown
                    key={addPartner ? "partner.dob" : "dob"}
                    name={addPartner ? "partner.gender" : "gender"}
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
                    key={addPartner ? "partner.dob" : "dob"}
                    name={addPartner ? "partner.email" : "email"}
                    label="Email"
                    placeholder="Enter Email"
                    required
                    type={"email"}
                    rules={{ required: "Email is required" }}
                    fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormInputText
                    key={addPartner ? "partner.dob" : "dob"}
                    name={addPartner ? "partner.contactNumber" : "contactNumber"}
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
