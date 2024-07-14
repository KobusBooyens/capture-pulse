import React from "react";
import { Grid } from "@mui/material";
import FormInputText from "../../../components/Input/FormInputText/FormInputText.jsx";
import FormInputDropdown from "../../../components/Input/FormInputDropdown/FormInputDropdown.jsx";
import goalsOptions from "../../../data/goalsOptions.js";
import { useParams } from "react-router-dom";

const AboutYouForm = () => {
    const { id } = useParams();
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <FormInputText
                    key={"weight"}
                    name={"weight"}
                    label={"Weight"}
                    type={"number"}
                    placeholder={"Enter Current Weight (kg) e.g. 80"}
                    fullWidth
                    required
                    rules={{
                        required: "Weight is required", min: {
                            value: 0,
                            message: "Weight must be greater than 0"
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormInputText
                    key={"length"}
                    name={"length"}
                    label={"Length"}
                    type={"number"}
                    placeholder={"Enter Length (m) e.g. 1.8"}
                    fullWidth
                    required
                    rules={{
                        required: "Length is required", min: {
                            value: 0,
                            message: "Length must be greater than 0"
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormInputDropdown
                    name={"goal"}
                    label={"Goal"}
                    placeholder={"Purpose of the program"}
                    options={goalsOptions}
                    required
                    rules={{ required: "Goal is required" }}
                />
            </Grid>
        </Grid>
    );
};

export default AboutYouForm;