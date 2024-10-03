import { FormControl, FormHelperText, InputAdornment, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

const FormInputDropdown = ({ options, name, label, rules, required, placeholder, helperText, ...props }) => {
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
                        { errors[name] && <FormHelperText>{errors[name].message}</FormHelperText>}
                        { !errors[name] && helperText && <FormHelperText>{helperText}</FormHelperText>}
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
    helperText: PropTypes.string,
    rules: PropTypes.object,
    required: PropTypes.bool,
};

export default FormInputDropdown;
