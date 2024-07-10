import { useEffect } from "react";

import { useLocation } from "react-router-dom";

import PropTypes from "prop-types";

import { useMaterialUIController, setLayout } from "../../context/materialUIControllerProvider.jsx";
import Box from "../../components/Box/Box.jsx";

function PageLayout({ background, children }) {
    const [, dispatch] = useMaterialUIController();
    const { pathname } = useLocation();

    useEffect(() => {
        setLayout(dispatch, "page");
    }, [pathname]);

    return (
        <Box
            width="100vw"
            height="100%"
            minHeight="100vh"
            bgColor={background}
            sx={{ overflowX: "hidden" }}
        >
            {children}
        </Box>
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
