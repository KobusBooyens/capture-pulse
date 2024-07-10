import PropTypes from "prop-types";
import Card from "@mui/material/Card";

import { useMaterialUIController } from "src/controls/Timeline/context/TimeLineProvider.js";
import { TimelineProvider } from "./context/TimeLineProvider.js";
import Box from "../../components/Box/Box.jsx";
import Typography from "../../components/Typography/Typography.jsx";

function TimelineList({ title, dark, children }) {
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;

    return (
        <TimelineProvider value={dark}>
            <Card>
                <Box
                    bgColor={dark ? "dark" : "white"}
                    variant="gradient"
                    borderRadius="xl"
                    sx={{ background: ({ palette: { background } }) => darkMode && background.card }}
                >
                    <Box pt={3} px={3}>
                        <Typography variant="h6" fontWeight="medium" color={dark ? "white" : "dark"}>
                            {title}
                        </Typography>
                    </Box>
                    <Box p={2}>{children}</Box>
                </Box>
            </Card>
        </TimelineProvider>
    );
}

TimelineList.defaultProps = {
    dark: false,
};

TimelineList.propTypes = {
    title: PropTypes.string.isRequired,
    dark: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

export default TimelineList;
