import React from "react";

import Box from "../../../components/Box/Box.jsx";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import Footer from "../../../controls/Footer/Footer.jsx";
import PageLayout from "../../../controls/LayoutContainers/PageLayout.jsx";

const CoverLayout = ({ coverHeight, image, children }) => {
    return (
        <PageLayout>
            <Box
                // width="calc(100% - 2rem)"
                // minHeight={coverHeight}
                borderRadius="xl"
                mx={5}
                my={2}
                pt={10}
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
            <Box mx={"auto"} mt={-12} py={3} px={2}>
                <Grid container spacing={1} justifyContent="center">
                    <Grid item xs={11} sm={4} md={8} lg={6} xl={4}>
                        {children}
                    </Grid>
                </Grid>
            </Box>
        </PageLayout>
    );
};

CoverLayout.propTypes = {
    coverHeight: PropTypes.string,
    image: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default CoverLayout;
