import React from "react";
import { Grid, InputAdornment } from "@mui/material";
import FormInputText from "../../../components/Input/FormInputText/FormInputText.jsx";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignInForm = () => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
                <FormInputText
                    variant={"standard"}
                    key={"email"}
                    name={"email"}
                    label="Email"
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
                    placeholder="Enter Password"
                    required
                    type={showPassword ? "text" : "password"}
                    rules={{ required: "Password is required" }}
                    fullWidth
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => handleClickShowPassword("password")}
                                onMouseDown={(e) => e.preventDefault()}
                                onMouseUp={(e) => e.preventDefault()}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </Grid>
        </Grid>
    );
};
export default SignInForm;
