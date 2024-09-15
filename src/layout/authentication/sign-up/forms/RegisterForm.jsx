import React from "react";
import { Grid, InputAdornment } from "@mui/material";
import FormInputText from "../../../../components/Input/FormInputText/FormInputText.jsx";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";

const RegisterForm = ({ disabled }) => {

    const [showPassword, setShowPassword] = React.useState({
        password: false,
        confirmPassword: false
    });

    const handleClickShowPassword = (name) => {
        setShowPassword(prevState => ({
            ...prevState, [name]: !prevState[name]
        }));
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
                <FormInputText
                    variant={"standard"}
                    key={"firstName"}
                    name={"firstName"}
                    label="First Name"
                    disabled={disabled}
                    placeholder="Enter First Name"
                    required
                    rules={{ required: "First Name is required" }}
                    fullWidth />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <FormInputText
                    variant={"standard"}
                    key={"lastName"}
                    name={"lastName"}
                    label="Last Name"
                    disabled={disabled}
                    placeholder="Enter Last Name"
                    required
                    rules={{ required: "Last Name is required" }}
                    fullWidth />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <FormInputText
                    variant={"standard"}
                    key={"contactNumber"}
                    name={"contactNumber"}
                    label="Contact Number"
                    disabled={disabled}
                    placeholder="Enter Contact Number"
                    fullWidth
                    required
                    rules={{
                        required: "Contact number is required",
                        pattern: { value: /^\d+$/, message: "Contact number must be digits only" }
                    }}
                />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <FormInputText
                    variant={"standard"}
                    key={"email"}
                    name={"email"}
                    label="Email"
                    disabled={disabled}
                    placeholder="Enter Email"
                    required
                    type={"email"}
                    rules={{ required: "Email is required" }}
                    fullWidth />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <FormInputText
                    variant={"standard"}
                    key={"password"}
                    name={"password"}
                    label="Password"
                    disabled={disabled}
                    placeholder="Enter Password"
                    required
                    type={showPassword.password ? "text" : "password"}
                    rules={{ required: "Password is required" }}
                    fullWidth
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                disabled={disabled}
                                aria-label="toggle password visibility"
                                onClick={() => handleClickShowPassword("password")}
                                onMouseDown={(e) => e.preventDefault()}
                                onMouseUp={(e) => e.preventDefault()}
                            >
                                {showPassword.password ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <FormInputText
                    variant={"standard"}
                    key={"confirmPassword"}
                    name={"confirmPassword"}
                    label="Confirm Password"
                    disabled={disabled}
                    placeholder="Enter Password again"
                    required
                    type={showPassword.confirmPassword ? "text" : "password"}
                    rules={{ required: "Password do not match" }}
                    fullWidth
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                disabled={disabled}
                                aria-label="toggle password visibility"
                                onClick={() => handleClickShowPassword("confirmPassword")}
                                onMouseDown={(e) => e.preventDefault()}
                                onMouseUp={(e) => e.preventDefault()}
                            >
                                {showPassword.confirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </Grid>
        </Grid>
    );
};

RegisterForm.propTypes = {
    disabled: PropTypes.bool
};

export default RegisterForm;
