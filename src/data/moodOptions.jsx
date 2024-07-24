import { Chip } from "@mui/material";

const options = [
    { value: 1, label: "Demotivated" },
    { value: 2, label: "Okay" },
    { value: 3, label: "Good" },
    { value: 4, label: "Very Good" }
];

const moodChips = {
    1 :  <Chip label="Demotivated" color="error" variant="outlined"/> ,
    2 :  <Chip label="Okay" color="warning" variant="outlined"/> ,
    3 :  <Chip label="Good" color="info" variant="outlined"/> ,
    4 :  <Chip label="Very Good" color="success" variant="outlined"/>
};

export default { options, moodChips };