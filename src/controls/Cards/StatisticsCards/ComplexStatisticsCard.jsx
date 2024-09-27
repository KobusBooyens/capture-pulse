import PropTypes from "prop-types";

import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Box from "../../../components/Box/Box.jsx";
import Typography from "../../../components/Typography/Typography.jsx";

function ComplexStatisticsCard({ color = "info", title, titleContent, children, icon }) {
    return (
        <Card>
            <Box display="flex" justifyContent="space-between" pt={1} px={2}>
                <Box
                    variant="gradient"
                    bgColor={color}
                    color={color === "light" ? "dark" : "white"}
                    coloredShadow={color}
                    borderRadius="xl"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="4rem"
                    height="4rem"
                    mt={-3}
                >
                    <Icon fontSize="medium" color="inherit">
                        {icon}
                    </Icon>
                </Box>
                <Box textAlign="right" lineHeight={1.25}>
                    <Typography variant="button" fontWeight="light" color="text">
                        {title}
                    </Typography>
                    <Typography variant="h4">{titleContent}</Typography>
                </Box>
            </Box>
            <Divider />
            <Box pb={2} px={2}>
                {children}
            </Box>
        </Card>
    );
}

ComplexStatisticsCard.propTypes = {
    color: PropTypes.oneOf([
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "light",
        "dark",
    ]),
    title: PropTypes.string.isRequired,
    titleContent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    icon: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    isLoading: PropTypes.bool,
};

export default ComplexStatisticsCard;
