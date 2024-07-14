import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";

const FormInputDropdown = ({ options, name, label, rules, required, placeholder, ...props }) => {
    const { control, formState: { errors } } = useFormContext();
    return (
        <FormControl fullWidth error={!!errors[name]}>
            <InputLabel id={`${label}-label`} required={required}>{label}</InputLabel>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field: { onChange, value } }) =>
                    <>
                        <Select
                            key={`${label}-id`}
                            id={`${label}-id`}
                            labelId={`${label}-label`}
                            value={value ?? ""}
                            label={label}
                            required={required}
                            onChange={onChange}
                            placeholder={placeholder}
                            {...props}
                        >
                            {options.map((option) =>
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            )}
                        </Select>
                        {errors[name] && <FormHelperText>{errors[name].message}</FormHelperText>}
                    </>
                }
            />
        </FormControl>
    );
};

FormInputDropdown.propTypes = {
    options: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    rules: PropTypes.object,
    required: PropTypes.bool,
};

export default FormInputDropdown;
