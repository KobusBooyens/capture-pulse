import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import FormInputText from "../FormInputText/FormInputText.jsx";

const FormInputDate = ({ name, label, rules, required, ...props }) => {
    const { control, formState: { errors } } = useFormContext();
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field: { onChange, value } }) =>
                    <DatePicker
                        value={value ? dayjs(value) : null}
                        onChange={(date) => onChange(date ? date.toISOString() : null)}
                        label={label}
                        sx={{ width: "100%" }}
                        format={"YYYY-MM-DD"}
                        renderInput={(params) =>
                            <FormInputText
                                {...params}
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
                            }
                        }}
                        maxDate={dayjs()}
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
};

export default FormInputDate;
