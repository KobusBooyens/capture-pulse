import { forwardRef } from "react";

import PropTypes from "prop-types";

import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import menuItem from "./styles.js";
import Box from "../../../components/Box/Box.jsx";
import Typography from "../../../components/Typography/Typography.jsx";

const NotificationItem = forwardRef(({ icon, title, children, ...rest }, ref) =>
    <MenuItem {...rest} ref={ref} sx={(theme) => menuItem(theme)}>
        <Box component={Link} py={0.5} display="flex" alignItems="center" lineHeight={1}>
            <Typography variant="body1" color="secondary" lineHeight={0.75}>
                {icon}
            </Typography>
            <Typography variant="button" fontWeight="regular" sx={{ ml: 1 }}>
                {title}
            </Typography>
            {children &&
            <Typography variant="button" fontWeight="regular" sx={{ ml: 1 }}>
                {children}
            </Typography>}
        </Box>
    </MenuItem>
);

// Typechecking props for the NotificationItem
NotificationItem.propTypes = {
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    children: !PropTypes.node.isRequired
};

export default NotificationItem;
