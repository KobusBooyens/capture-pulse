import React from "react";

import Box from "../../../components/Box/Box.jsx";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import PageLayout from "../../../controls/LayoutContainers/PageLayout.jsx";
import bgImage from "../../../assets/images/bg_cover_sign_up.jpg";

const SignUpLayout = ({ children }) => {
    const image = bgImage;
    return (
        <>
            <Box
                width="calc(100% - 2rem)"
                // minHeight={coverHeight}
                borderRadius="xl"
                mx={2}
                my={2}
                pt={6}
                pb={28}
                sx={{ backgroundImage: ({
                    functions: { linearGradient, rgba },
                    palette: { gradients } }) =>
                    image && `${linearGradient(
                        rgba(gradients.dark.main, 0.4),
                        rgba(gradients.dark.state, 0.4))}, url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                }}
            />
            <Box px={1} width="100%" height="100vh" mx="auto">
                <Grid container spacing={1} justifyContent="center">
                    <Grid item xs={8} sm={8} md={8} lg={6} xl={4}>
                        {children}
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

SignUpLayout.propTypes = {

    children: PropTypes.node.isRequired,
};

export default SignUpLayout;
