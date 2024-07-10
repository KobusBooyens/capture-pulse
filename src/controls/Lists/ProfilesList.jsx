import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Card from "@mui/material/Card";
import Box from "../../components/Box/Box.jsx";
import Avatar from "../../components/Avatar/Avatar.jsx";
import Typography from "../../components/Typography/Typography.jsx";
import Button from "../../components/Button/Button.jsx";

function ProfilesList({ title, profiles, shadow }) {
    const renderProfiles = profiles.map(({ image, name, description, action }) => 
        <Box key={name} component="li" display="flex" alignItems="center" py={1} mb={1}>
            <Box mr={2}>
                <Avatar src={image} alt="something here" shadow="md" />
            </Box>
            <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
                <Typography variant="button" fontWeight="medium">
                    {name}
                </Typography>
                <Typography variant="caption" color="text">
                    {description}
                </Typography>
            </Box>
            <Box ml="auto">
                {action.type === "internal" ? 
                    <Button component={Link} to={action.route} variant="text" color="info">
                        {action.label}
                    </Button>
                    : 
                    <Button
                        component="a"
                        href={action.route}
                        target="_blank"
                        rel="noreferrer"
                        variant="text"
                        color={action.color}
                    >
                        {action.label}
                    </Button>
                }
            </Box>
        </Box>
    );

    return (
        <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
            <Box pt={2} px={2}>
                <Typography variant="h6" fontWeight="medium" textTransform="capitalize">
                    {title}
                </Typography>
            </Box>
            <Box p={2}>
                <Box component="ul" display="flex" flexDirection="column" p={0} m={0}>
                    {renderProfiles}
                </Box>
            </Box>
        </Card>
    );
}

ProfilesList.defaultProps = {
    shadow: true,
};

ProfilesList.propTypes = {
    title: PropTypes.string.isRequired,
    profiles: PropTypes.arrayOf(PropTypes.object).isRequired,
    shadow: PropTypes.bool,
};

export default ProfilesList;
