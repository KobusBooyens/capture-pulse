import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import Typography from "../../../components/Typography/Typography.jsx";

const ComingSoon = () => {
    return (
        <Card>
            <Box padding={4}
                variant="gradient"
                bgColor={"light"}
                color={"light"}
                coloredShadow={"primary"}
                borderRadius="xl"
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={2}>

                <Icon fontSize="large" color="inherit">
                    {"construction"}
                </Icon>
                <Typography variant="h3" fontWeight="light" color="text">
          Coming Soon...
                </Typography>
            </Box>
        </Card>
    );
};
export default ComingSoon;
