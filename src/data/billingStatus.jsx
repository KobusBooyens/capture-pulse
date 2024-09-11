import { Chip } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

const options = [
    { value: 0, label: "Up To Date" },
    { value: 1, label: "Follow up" },
    { value: 2, label: "In Arrears" },
    { value: 3, label: "Pending" },
];

const statusChips = {
    0 :  <Chip label="Up To Date" color="success" variant="outlined"/>,
    1 :  <Chip label="Follow up" color="warning" variant="outlined"/>,
    2 :  <Chip label="In Arrears" color="error" variant="outlined"/>,
    3 :  <Chip label="Pending..." color="primary" variant="outlined"/>
};

export default { options, statusChips };