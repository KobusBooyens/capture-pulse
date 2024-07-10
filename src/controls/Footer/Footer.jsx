import PropTypes from "prop-types";

import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

import typography from "../../assets/theme/base/typography";
import Box from "../../components/Box/Box.jsx";
import Typography from "../../components/Typography/Typography.jsx";

function Footer({ company, links }) {
    const { name } = company;
    const { size } = typography;

    const renderLinks = () =>
        links.map((link) => 
            <Box key={link.name} component="li" px={2} lineHeight={1}>
                <Link href={link.href} target="_blank">
                    <Typography variant="button" fontWeight="regular" color="text">
                        {link.name}
                    </Typography>
                </Link>
            </Box>
        );

    return (
        <Box
            width="100%"
            display="flex"
            flexDirection={{ xs: "column", lg: "row" }}
            justifyContent="space-between"
            alignItems="center"
            px={1.5}
        >
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexWrap="wrap"
                color="text"
                fontSize={size.sm}
                px={1.5}
            >
        &copy; {new Date().getFullYear()} {name} v0.01

            </Box>
            <Box
                component="ul"
                sx={({ breakpoints }) => ({
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                    listStyle: "none",
                    mt: 3,
                    mb: 0,
                    p: 0,

                    [breakpoints.up("lg")]: {
                        mt: 0,
                    },
                })}
            >
                {/*{renderLinks()}*/}
            </Box>
        </Box>
    );
}

// Setting default values for the props of Footer
Footer.defaultProps = {
    company: { name: "Capture Pulse" }
};

// Typechecking props for the Footer
Footer.propTypes = {
    company: PropTypes.objectOf(PropTypes.string),
    links: PropTypes.arrayOf(PropTypes.object),
};

export default Footer;
