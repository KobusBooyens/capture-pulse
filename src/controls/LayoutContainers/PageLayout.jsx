import { useEffect } from "react";

import { useLocation } from "react-router-dom";

import PropTypes from "prop-types";

import { useUISettingsController, setLayout } from "../../context/ui-settings-provider.jsx";
import Box from "../../components/Box/Box.jsx";
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";

function PageLayout({ children }) {
    const [, dispatch] = useUISettingsController();
    const { pathname } = useLocation();

    useEffect(() => {
        setLayout(dispatch, "page");
    }, [pathname]);

    return (
        <Box pt={6} pb={3}>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        {children}

                    </Card>
                </Grid>
            </Grid>
        </Box>
        // <Box
        //     width="100vw"
        //     height="100%"
        //     minHeight="100vh"
        //     bgColor={background}
        //     sx={{ overflowX: "hidden" }}
        // >
        //     {children}
        // </Box>
    );
}

PageLayout.defaultProps = {
    background: "default",
};

PageLayout.propTypes = {
    background: PropTypes.oneOf(["white", "light", "default"]),
    children: PropTypes.node.isRequired,
};

export default PageLayout;
