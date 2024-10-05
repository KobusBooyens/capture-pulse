import { Chip } from "@mui/material";
import Box from "../components/Box/Box.jsx";
import Icon from "@mui/material/Icon";
import React from "react";
import Typography from "../components/Typography/Typography.jsx";

const membershipStatusChips = {
    0 :  <Chip
        color="warning"
        variant="filled"
        label={
            <Box display={"flex"} alignItems="center" gap={1} >
                <Icon fontSize={"small"}>card_membership</Icon>
                <Typography variant={"caption"} fontWeight={"medium"} >
                Pending
                </Typography>
            </Box>
        }
    /> ,
    1 :  <Chip
        color="info"
        variant="filled"
        label={
            <Box display={"flex"} alignItems="center" gap={1} >
                <Icon fontSize={"small"}>card_membership</Icon>
                <Typography variant={"caption"} fontWeight={"medium"}>
                Pending First Payment
                </Typography>
            </Box>
        }
    /> ,
    2 :  <Chip
        color="success"
        variant="filled"
        label={
            <Box display={"flex"} alignItems="center" gap={1} >
                <Icon fontSize={"small"}>card_membership</Icon>
                <Typography variant={"caption"} fontWeight={"light"} color={"text"}>
                Good
                </Typography>
            </Box>
        }
    /> ,
    3 :  <Chip
        color="error"
        variant="filled"
        label={ <Box display={"flex"} alignItems="center" gap={1} >
            <Icon fontSize={"small"}>card_membership</Icon>
            <Typography variant={"caption"} fontWeight={"light"} color={"text"}>
            In Arrears
            </Typography>
        </Box>
        }
    />,
    4 :  <Chip
        color="warning"
        variant="filled"
        label={ <Box display={"flex"} alignItems="center" gap={1} >
            <Icon fontSize={"small"}>card_membership</Icon>
            <Typography variant={"caption"} fontWeight={"light"} color={"text"}>
            Follow up
            </Typography>
        </Box>
        }
    />
};

export default { membershipStatusChips };