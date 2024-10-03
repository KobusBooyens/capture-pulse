import PropTypes from "prop-types";

import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Box from "../../../components/Box/Box.jsx";
import Typography from "../../../components/Typography/Typography.jsx";
import CardSkeleton from "../CardSkeleton.jsx";

function StandardStatisticsCard({ color= "info", title, subTitle, children, icon, watermark, isLoading }) {
    return (
        <Box>
            {isLoading ?
                <CardSkeleton/> :
                <Card >
                    <Typography
                        variant="h1"
                        fontWeight="bold"
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            opacity: 0.1,
                            fontSize: "5rem",
                            zIndex: 1,
                        }}
                    >
                        {watermark}
                    </Typography>
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

                            <Typography variant="h6" fontWeight="light">
                                {title}
                            </Typography>
                            <Typography variant="button">{subTitle}</Typography>
                        </Box>
                    </Box>
                    <Divider light={true} />
                    <Box pb={2} px={2} >
                        {children}
                    </Box>
                </Card>
            }
        </Box>

    );
}

StandardStatisticsCard.propTypes = {
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
    title: PropTypes.string,
    watermark: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node]),
    subTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    icon: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    isLoading: PropTypes.bool
};

export default StandardStatisticsCard;
