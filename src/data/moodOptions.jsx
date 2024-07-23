import { Chip } from "@mui/material";

const options = [
    { value: 1, label: "Demotivated" },
    { value: 2, label: "Okay" },
    { value: 3, label: "Good" },
    { value: 4, label: "Very Good" }
];

const moodChips = {
    1 :  <Chip label={"Demotivated"} color={"error"}/> ,
    2 :  <Chip label={"Okay"} color={"warning"}/> ,
    3 :  <Chip label={"Good"} color={"info"}/> ,
    4 :  <Chip label={"Very Good"} color={"success"}/> ,
};

export default { options, moodChips }
;