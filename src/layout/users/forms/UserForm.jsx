import React from "react";
import { CircularProgress, Grid, InputAdornment } from "@mui/material";
import FormInputText from "../../../components/Input/FormInputText/FormInputText.jsx";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Box from "../../../components/Box/Box.jsx";
import Button from "../../../components/Button/Button.jsx";
import FormInputDropdown from "../../../components/Input/FormInputDropdown/FormInputDropdown.jsx";

const UserForm = ({ onCancel, isLoading, adding }) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(prevState => !prevState);
    };

    const roles = [
        { value: "Admin", label: "Admin" }
    ];

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
                <FormInputText
                    key={"firstName"}
                    name={"firstName"}
                    label="First Name"
                    placeholder="Enter First Name"
                    required
                    rules={{ required: "First Name is required" }}
                    fullWidth />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <FormInputText
                    key={"lastName"}
                    name={"lastName"}
                    label="Last Name"
                    placeholder="Enter Last Name"
                    required
                    rules={{ required: "Last Name is required" }}
                    fullWidth />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
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
            <Grid item xs={12} md={12} lg={12}>
                <FormInputText
                    key={"email"}
                    name={"email"}
                    label="Email"
                    placeholder="Enter Email"
                    required
                    type={"email"}
                    rules={{ required: "Email is required" }}
                    fullWidth />
            </Grid>
            {adding && <Grid item xs={12} md={12} lg={12}>
                <FormInputText
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
                                onClick={() => handleClickShowPassword()}
                                onMouseDown={(e) => e.preventDefault()}
                                onMouseUp={(e) => e.preventDefault()}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </Grid>}

            <Grid item xs={12} md={12} lg={12}>
                <FormInputDropdown
                    key={"role"}
                    name="role"
                    label={"Role"}
                    placeholder={"Select Role"}
                    options={roles}
                    required
                    rules={{ required: "Role is required" }}
                />
            </Grid>
            <Box display="flex" justifyContent="end" marginTop={2} width="100%" mb={2}>
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
export default UserForm;
