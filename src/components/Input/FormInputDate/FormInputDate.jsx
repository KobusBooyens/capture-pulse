import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import FormInputText from "../FormInputText/FormInputText.jsx";
import { InputAdornment } from "@mui/material";
import Icon from "@mui/material/Icon";

const FormInputDate = ({ name, label, rules, required, maxDate= dayjs(), variant = "outlined", ...props }) => {
    const { control, formState: { errors } } = useFormContext();
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
                name={name}
                control={control}
                rules={rules}
                variant={"standard"}
                render={({ field: { onChange, value } }) =>
                    <DatePicker
                        variant={"standard"}
                        value={value ? dayjs(value) : null}
                        onChange={(date) => onChange(date ? date.toISOString() : null)}
                        label={label}
                        sx={{ width: "100%" }}
                        format={"YYYY-MM-DD"}
                        maxDate={maxDate}
                        renderInput={(params) => 
                            <FormInputText
                                {...params}
                                variant={"standard"}
                                fullWidth
                                error={!!errors[name]}
                                helperText={errors[name] ? errors[name].message : null}
                                required={required}
                            />

                        }
                        slotProps={{
                            textField: {
                                helperText: errors[name] ? errors[name].message : null,
                                error: !!errors[name],
                                variant:  variant,
                                InputProps: {
                                    startAdornment:
                                  <InputAdornment position="start">
                                      <Icon>calendar_month</Icon>
                                  </InputAdornment>
                                },
                            },
                        }}

                    />
                }
            />
        </LocalizationProvider>
    );
};

FormInputDate.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    rules: PropTypes.object,
    required: PropTypes.bool,
    maxDate: PropTypes.string || null,
    variant: PropTypes.oneOf(["standard", "outlined", "filled"]),
};

export default FormInputDate;
