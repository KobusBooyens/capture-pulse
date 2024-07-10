import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import MuiLink from "@mui/material/Link";
import Box from "../../../components/Box/Box.jsx";
import Typography from "../../../components/Typography/Typography.jsx";
import Button from "../../../components/Button/Button.jsx";

function SimpleBlogCard({ image, title, description, action }) {
    return (
        <Card>
            <Box position="relative" borderRadius="lg" mt={-3} mx={2}>
                <Box
                    component="img"
                    src={image}
                    alt={title}
                    borderRadius="lg"
                    shadow="md"
                    width="100%"
                    height="100%"
                    position="relative"
                    zIndex={1}
                />
                <Box
                    borderRadius="lg"
                    shadow="md"
                    width="100%"
                    height="100%"
                    position="absolute"
                    left={0}
                    top="3%"
                    sx={{
                        backgroundImage: `url(${image})`,
                        transform: "scale(0.94)",
                        filter: "blur(12px)",
                        backgroundSize: "cover",
                    }}
                />
            </Box>
            <Box p={3}>
                <Typography display="inline" variant="h3" textTransform="capitalize" fontWeight="bold">
                    {title}
                </Typography>
                <Box mt={2} mb={3}>
                    <Typography variant="body2" component="p" color="text">
                        {description}
                    </Typography>
                </Box>
                {action.type === "external" ?
                    <MuiLink href={action.route} target="_blank" rel="noreferrer">
                        <Button color={action.color ? action.color : "dark"}>{action.label}</Button>
                    </MuiLink>
                    :
                    <Link to={action.route}>
                        <Button color={action.color ? action.color : "dark"}>{action.label}</Button>
                    </Link>
                }
            </Box>
        </Card>
    );
}

SimpleBlogCard.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    action: PropTypes.shape({
        type: PropTypes.oneOf(["external", "internal"]).isRequired,
        route: PropTypes.string.isRequired,
        color: PropTypes.oneOf([
            "primary",
            "secondary",
            "info",
            "success",
            "warning",
            "error",
            "dark",
            "light",
            "default",
        ]),
        label: PropTypes.string.isRequired,
    }).isRequired,
};

export default SimpleBlogCard;
