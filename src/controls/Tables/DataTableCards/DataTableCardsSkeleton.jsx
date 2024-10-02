import React from "react";
import { CardContent, Chip, Grid, Skeleton } from "@mui/material";
import Box from "../../../components/Box/Box.jsx";

const DataTableCardsSkeleton = () => {
    return (
        <Grid container spacing={2} px={2} py={2}>
            {[...Array(6)].map((_, key) => 
                <Grid item xs={12} sm={12} md={12} lg={4} key={key}>
                    <Box shadow={2} variant={"gradient"} borderRadius="lg" coloredShadow="dark">
                        <CardContent>
                            <Box display={"flex"} flexDirection={"column"} gap={1}>
                                <Box display={"flex"} justifyContent={"space-between"} pt={2}>
                                    <Box display="flex" flexDirection="column" width="100%">
                                        <Skeleton variant="text" width="100%" />
                                        <Skeleton variant="text" width="50%" />
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>
                    </Box>
                </Grid>
            )}
        </Grid>
    );
};

export default DataTableCardsSkeleton;
