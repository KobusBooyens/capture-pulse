import React from "react";

import Box from "../../../components/Box/Box.jsx";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import PageLayout from "../../../controls/LayoutContainers/PageLayout.jsx";

const SignInLayout = ({ image, children }) => {
    return (
        <PageLayout>
            <Box
                position="absolute"
                width="100%"
                minHeight="100vh"
                sx={{
                    backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
                        image &&
                  `${linearGradient(
                      rgba(gradients.dark.main, 0.6),
                      rgba(gradients.dark.state, 0.6)
                  )}, url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            />
            <Box px={1} width="100%" height="100vh" mx="auto">
                <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
                    <Grid item xs={8} sm={8} md={8} lg={6} xl={4}>
                        {/*xs={11} sm={9} md={5} lg={4} xl={3}*/}
                        {children}
                    </Grid>
                </Grid>
            </Box>
        </PageLayout>
    );
};

SignInLayout.propTypes = {
    coverHeight: PropTypes.string,
    image: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default SignInLayout;
