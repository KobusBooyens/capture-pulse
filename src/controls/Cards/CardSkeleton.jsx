import React from "react";
import Box from "../../components/Box/Box.jsx";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import { Skeleton } from "@mui/material";

const CardSkeleton = () => {
    return (
        <Card>
            <Box display="flex" justifyContent="space-between" pt={1} px={2}>
                <Box
                    variant="gradient"
                    borderRadius="xl"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="4rem"
                    height="4rem"
                    mt={-3}
                >
                    <Skeleton variant="circular" width={40} height={40} animation={"wave"} />
                </Box>
                <Box textAlign="right" lineHeight={1.25}>
                    <Skeleton variant="text" width={100} animation={"wave"}/>
                    <Skeleton variant="text" width={60} animation={"wave"}/>
                </Box>
            </Box>
            <Divider />
            <Box pb={2} px={2}>
                <Skeleton variant="rectangular" height={50} animation={"pulse"}/>
            </Box>
        </Card>
    );
};
export default CardSkeleton;
