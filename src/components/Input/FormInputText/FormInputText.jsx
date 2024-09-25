import React from "react";
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";

const FormInputText = ({ name, label, rules, required, endAdornment, startAdornment, ...props }) => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange, value, ...fieldProps } }) =>
                <TextField
                    {...fieldProps}
                    label={label}
                    error={!!errors[name]}
                    helperText={errors[name] ? errors[name].message : null}
                    onChange={onChange}
                    value={value || ""}
                    required={required}
                    InputProps={{
                        endAdornment: endAdornment,
                        startAdornment: startAdornment
                    }}
                    {...props}
                />
            }
        />
    );
};

FormInputText.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    rules: PropTypes.object,
    endAdornment: PropTypes.node,
    startAdornment: PropTypes.node,
    required: PropTypes.bool,
};

export default FormInputText;
