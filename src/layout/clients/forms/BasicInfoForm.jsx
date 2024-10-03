import React, { useEffect, useState } from "react";
import FormInputText from "../../../components/Input/FormInputText/FormInputText.jsx";
import { CircularProgress, Grid, InputAdornment } from "@mui/material";
import FormInputDate from "../../../components/Input/FormInputDate/FormInputDate.jsx";
import FormInputDropdown from "../../../components/Input/FormInputDropdown/FormInputDropdown.jsx";
import genderOptions from "../../../data/genderOptions.js";
import PropTypes from "prop-types";
import Box from "../../../components/Box/Box.jsx";
import Button from "../../../components/Button/Button.jsx";
import { useGetUsers } from "../../../api/users/useUserFetch.js";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import ViewClientsPage from "../pages/ViewClientsPage.jsx";

const BasicInfoForm = ({ isLoading, onCancel }) => {
    const getUsers = useGetUsers();

    let userOptions = [];
    if (!getUsers.isPending && getUsers.isSuccess && getUsers.data ) {
        userOptions = getUsers.data.map(r => ({
            value: r._id,
            label: `${r.firstName} ${r.lastName}`
        }));
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <FormInputText
                    key={"firstName"}
                    name={"firstName"}
                    label="First Name"
                    placeholder="Enter First Name"
                    required
                    rules={{ required: "First Name is required" }}
                    fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormInputText
                    key={"lastName"}
                    name={"lastName"}
                    label="Last Name"
                    placeholder="Enter Last Name"
                    required
                    rules={{ required: "Last Name is required" }}
                    fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormInputDropdown
                    key={"gender"}
                    name={"gender"}
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
                    key={"contactNumber"}
                    name={"contactNumber"}
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
            <Grid item xs={12} md={6}>
                <FormInputText
                    key={"email"}
                    name={"email"}
                    label="Email"
                    placeholder="Enter Email"
                    type={"email"}
                    // required
                    //
                    // rules={{ required: "Email is required" }}
                    fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormInputDate
                    key={"dob"}
                    name={"dob"}
                    label={"Date Of Birth"}
                    fullWidth
                    // required
                    // rules={{ required: "Date Of Birth is required" }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <Box display={"flex"} gap={1} alignItems={"center"}>
                    <FormInputDropdown
                        key={"agent"}
                        name={"agent"}
                        label="Agent"
                        placeholder="Select Agent"
                        options={userOptions}
                        helperText={"Agent represents the user who signed up the client"}
                        fullWidth
                        required
                        rules={{ required: "Agent is required" }}
                    />
                    <Tooltip title="Agent represents the user who signed up the client"
                        placement={"top"}
                        arrow={false} >
                        <Icon color={"info"}>info</Icon>
                    </Tooltip>

                </Box>

            </Grid>
            <Box display="flex" justifyContent="end" marginTop={2} width="100%">
                {isLoading && <CircularProgress/>}
                {!isLoading &&
              <>
                  <Button onClick={onCancel}
                      color="secondary"
                      type={"button"}
                      sx={{ mx: 1 }}>
                  CANCEL
                  </Button>
                  <Button
                      color="primary"
                      type={"submit"}
                      sx={{ mx: 1 }}>
                  SUBMIT
                  </Button>
              </>
                }
            </Box>
        </Grid>
    );
};

BasicInfoForm.propTypes = {
    isLoading: PropTypes.bool,
    onCancel: PropTypes.func,
};

export default BasicInfoForm;
