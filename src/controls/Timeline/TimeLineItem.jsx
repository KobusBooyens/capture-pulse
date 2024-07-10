import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import { useTimeline } from "./context/TimeLineProvider.js";
import Box from "../../components/Box/Box.jsx";
import timelineItem from "./styles.js";
import Typography from "../../components/Typography/Typography.jsx";

function TimelineItem({ color, icon, title, dateTime, description, lastItem }) {
    const isDark = useTimeline();

    return (
        <Box position="relative" mb={3} sx={(theme) => timelineItem(theme, { lastItem, isDark })}>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgColor={color}
                color="white"
                width="2rem"
                height="2rem"
                borderRadius="50%"
                position="absolute"
                top="8%"
                left="2px"
                zIndex={2}
                sx={{ fontSize: ({ typography: { size } }) => size.sm }}
            >
                <Icon fontSize="inherit">{icon}</Icon>
            </Box>
            <Box ml={5.75} pt={description ? 0.7 : 0.5} lineHeight={0} maxWidth="30rem">
                <Typography variant="button" fontWeight="medium" color={isDark ? "white" : "dark"}>
                    {title}
                </Typography>
                <Box mt={0.5}>
                    <Typography variant="caption" color={isDark ? "secondary" : "text"}>
                        {dateTime}
                    </Typography>
                </Box>
                <Box mt={2} mb={1.5}>
                    {description ? 
                        <Typography variant="button" color={isDark ? "white" : "dark"}>
                            {description}
                        </Typography>
                        : null}
                </Box>
            </Box>
        </Box>
    );
}

// Setting default values for the props of TimelineItem
TimelineItem.defaultProps = {
    color: "info",
    lastItem: false,
    description: "",
};

// Typechecking props for the TimelineItem
TimelineItem.propTypes = {
    color: PropTypes.oneOf([
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "dark",
        "light",
    ]),
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    dateTime: PropTypes.string.isRequired,
    description: PropTypes.string,
    lastItem: PropTypes.bool,
};

export default TimelineItem;
