import React, { useEffect } from "react";
import bgImage from "../../../assets/images/signin/bg_sign_in.jpg";
import bgImage1 from "../../../assets/images/signin/bg_sign_in_1.jpg";
import bgImage2 from "../../../assets/images/signin/bg_sign_in_2.jpg";
import bgImage3 from "../../../assets/images/signin/bg_sign_in_3.jpg";
import bgImage4 from "../../../assets/images/signin/bg_sign_in_4.jpg";
import bgImage5 from "../../../assets/images/signin/bg_sign_in_5.jpg";
import bgImage6 from "../../../assets/images/signin/bg_sign_in_6.jpg";
import Box from "../../../components/Box/Box.jsx";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import PageLayout from "../../../controls/LayoutContainers/PageLayout.jsx";

const bgImages = [bgImage, bgImage1, bgImage2, bgImage3, bgImage4, bgImage5, bgImage6];
const randomBgImage = bgImages[Math.floor(Math.random() * bgImages.length)];

const SignInLayout = ({ children }) => {

    return (
        <PageLayout>
            <Box
                position="absolute"
                width="100%"
                minHeight="100vh"
                sx={{
                    backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
                        randomBgImage &&
                  `${linearGradient(
                      rgba(gradients.dark.main, 0.6),
                      rgba(gradients.dark.state, 0.6)
                  )}, url(${randomBgImage})`,
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
    children: PropTypes.node.isRequired,
};

export default SignInLayout;
