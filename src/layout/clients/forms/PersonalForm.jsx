import React from "react";
import { useParams } from "react-router-dom";
import Box from "../../../components/Box/Box.jsx";
import Typography from "../../../components/Typography/Typography.jsx";

const PersonalForm = () => {
    const { id } = useParams();

    return (
        <Box>
            <Typography varient={"h6"}>

            </Typography>
        </Box>
    );
};
export default PersonalForm;
