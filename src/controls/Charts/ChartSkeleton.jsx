import React, { useMemo } from "react";
import Card from "@mui/material/Card";
import Box from "../../components/Box/Box.jsx";
import { CircularProgress, Skeleton } from "@mui/material";

import Divider from "@mui/material/Divider";

const ChartSkeleton = () => {
    return (
        <Box padding="1rem">

            <Skeleton variant="rectangular" width="100%" height={40} animation={"wave"} />
            <Box pt={3} pb={1} px={1} >
                <Skeleton variant="text" width={150} animation={"pulse"}/>
                <Skeleton variant="text" width={250} animation={"pulse"}/>
                <Divider />
                <Box display="flex" alignItems="center">
                    <Skeleton variant="rectangular" width="100%" height={40} animation={"wave"}/>
                </Box>
            </Box>
        </Box>
    );
};
export default ChartSkeleton;
