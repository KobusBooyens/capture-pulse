import React, { useEffect, useState } from "react";
import breakpoints from "../../../assets/theme/base/breakpoints.js";
import Box from "../../../components/Box/Box.jsx";
import backgroundImage from "../../../assets/images/settings/bg_settings.jpg";
import Card from "@mui/material/Card";
import { Grid, Tab, Tabs } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Icon from "@mui/material/Icon";
import PropTypes from "prop-types";

const Header = ({ menuItems, onTabChange, children }) => {
    const [tabsOrientation, setTabsOrientation] = useState("horizontal");
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        function handleTabsOrientation() {
            return window.innerWidth < breakpoints.values.md
                ? setTabsOrientation("vertical")
                : setTabsOrientation("horizontal");
        }

        window.addEventListener("resize", handleTabsOrientation);

        handleTabsOrientation();

        return () => window.removeEventListener("resize", handleTabsOrientation);
    }, [tabsOrientation]);

    const handleSetTabValue = (event, newValue) => {
        setTabValue(newValue);
        onTabChange(newValue);
    };
  
    return (
        <Box position={"relative"} mb={5}>
            <Box
                display="flex"
                alignItems="center"
                position="relative"
                minHeight="18.75rem"
                borderRadius="xl"
                sx={{
                    backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
                        `${linearGradient(
                            rgba(gradients.info.main, 0.6),
                            rgba(gradients.info.state, 0.6)
                        )}, url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "50%",
                    overflow: "hidden",
                }}
            />
            <Card
                sx={{
                    position: "relative",
                    mt: -8,
                    mx: 3,
                    py: 2,
                    px: 2,
                }}
            >
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={6} lg={6} sx={{ ml: "auto" }}>
                        <AppBar position="static">
                            <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                                {menuItems.map((item) =>
                                    <Tab
                                        key={item.label}
                                        label={item.label}
                                        icon={
                                            <Icon fontSize="small" sx={{ mt: -0.25 }}>
                                                {item.icon}
                                            </Icon>
                                        }
                                    />
                                )}
                            </Tabs>
                        </AppBar>
                    </Grid>
                </Grid>
                {children}
            </Card>
        </Box>
    );
};

Header.propTypes = {
    menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    children: PropTypes.node,
    onTabChange: PropTypes.func.isRequired
};

export default Header;
