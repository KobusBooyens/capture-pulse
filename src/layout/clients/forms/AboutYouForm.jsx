import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import FormInputText from "../../../components/Input/FormInputText/FormInputText.jsx";
import FormInputDropdown from "../../../components/Input/FormInputDropdown/FormInputDropdown.jsx";
import PropTypes from "prop-types";
import { useGoals } from "../../../api/goals/useGoalFetch.js";

const AboutYouForm = ({ addPartner }) => {
    const goals = useGoals();

    const [goalOptions, setGoalOptions] = useState([]);

    useEffect(() => {
        if (goals.data) {
            setGoalOptions(goals?.data.map(g => ({ label: g.name, value: g.name })));
        }

    }, [goals.data]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <FormInputText
                    key={addPartner ? "partnerWeight" : "weight"}
                    name={addPartner ? "partnerWeight" : "weight"}
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
                    key={addPartner ? "partnerLength" : "length"}
                    name={addPartner ? "partnerLength" : "length"}
                    label={"Length"}
                    type={"number"}
                    placeholder={"Enter Length (cm) e.g. 180"}
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
                    name={addPartner ? "partnerGoal" : "goal"}
                    label={goals.isPending ? "Loading goals..." : "Goal"}
                    placeholder={"Select a goal"}
                    disabled={goals.isPending}
                    options={goalOptions}
                    required
                    rules={{ required: "Goal is required" }}
                />
            </Grid>
        </Grid>
    );
};

AboutYouForm.propTypes = {
    addPartner: PropTypes.bool
};

export default AboutYouForm;