import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import Typography from "../../Typography/Typography.jsx";
import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";

const FormInputCheckbox = ({ name, rules, label, ...props }) => {
    const { control } = useFormContext();
  
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange, value, ...fieldProps } }) =>
                <FormControlLabel
                    control={<Checkbox onChange={onChange} value={value} checked={value} />}
                    label={<Typography variant={"button"}>{label}</Typography>}/>
            }
            {...props}
        />
    );
};
FormInputCheckbox.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rules: PropTypes.object,
};

export default FormInputCheckbox;
