import React from "react";
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";

const FormInputText = ({ name, label, rules, required, ...props }) => {
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
                    {...props}
                />
            }
        />
    );
};

FormInputText.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    rules: PropTypes.object,
    required: PropTypes.bool,
};

export default FormInputText;
