import PropTypes from "prop-types";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";
import Collapse from "@mui/material/Collapse";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
    collapseItem,
    collapseIconBox,
    collapseText,
} from "./styles/sidenavCollapse";

import { useUISettingsController } from "../../context/UISettingsProvider.jsx";
import Box from "../../components/Box/Box.jsx";

function SidenavCollapse({ icon, name, active, subMenuItems, mainMenuKey, setActiveMenu, activeMenuKey, ...rest }) {
    const [controller] = useUISettingsController();
    const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
    const [open, setOpen] = useState(false);

    const location = useLocation();

    const handleToggle = () => {
        if (open) {
            setOpen(false);
            setActiveMenu("");
        } else {
            setActiveMenu(mainMenuKey);
        }
    };

    useEffect(() => {
        if (activeMenuKey === mainMenuKey) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [activeMenuKey, mainMenuKey]);

    const subMenuItemName = location.pathname.replace("/", "");
    const isSubMenuRouteActive = (currentRoute) => {
        return currentRoute.replace("/", "") === subMenuItemName;
    };

    const subMenuItemsList = () => {
        return <Collapse in={open} timeout="auto" unmountOnExit>
            {subMenuItems.map((menuItem) =>
                <NavLink key={menuItem.key} to={menuItem.route} >
                    <Box
                        {...rest}
                        sx={(theme) =>
                            collapseItem(theme, {
                                active: isSubMenuRouteActive(menuItem.route),
                                isSubMenuItem: true,
                                transparentSidenav,
                                whiteSidenav,
                                darkMode,
                                sidenavColor
                            })
                        }
                    >
                        <ListItemIcon
                            sx={(theme) =>
                                collapseIconBox(theme, {
                                    transparentSidenav,
                                    whiteSidenav,
                                    darkMode,
                                    active
                                })
                            }
                        >
                            {menuItem.icon}
                        </ListItemIcon>

                        <ListItemText
                            primary={menuItem.name}
                            sx={(theme) =>
                                collapseText(theme, {
                                    miniSidenav,
                                    transparentSidenav,
                                    whiteSidenav,
                                    active,
                                    isSubMenuItem: true
                                })
                            }
                        />
                    </Box>
                </NavLink>
            )}
        </Collapse>;
    };

    return (
        <>
            <ListItem component="li" onClick={handleToggle}>
                <Box
                    {...rest}
                    sx={(theme) =>
                        collapseItem(theme, {
                            active,
                            transparentSidenav,
                            whiteSidenav,
                            darkMode,
                            sidenavColor,
                        })
                    }
                >
                    <ListItemIcon
                        sx={(theme) =>
                            collapseIconBox(theme, { transparentSidenav, whiteSidenav, darkMode, active })
                        }
                    >
                        {icon}
                    </ListItemIcon>

                    <ListItemText
                        primary={name}
                        sx={(theme) =>
                            collapseText(theme, {
                                miniSidenav,
                                transparentSidenav,
                                whiteSidenav,
                                active,
                            })
                        }
                    />
                    {subMenuItems && <Icon>{open ? "expand_less" : "expand_more"}</Icon>}
                </Box>
            </ListItem>
            {subMenuItems && subMenuItemsList()}
        </>
    );
}

// Setting default values for the props of SidenavCollapse
SidenavCollapse.defaultProps = {
    active: false,
    children: null,
};

// Typechecking props for the SidenavCollapse
SidenavCollapse.propTypes = {
    icon: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
    active: PropTypes.bool,
    subMenuItems: PropTypes.arrayOf(PropTypes.object),
    mainMenuKey: PropTypes.string.isRequired,
    setActiveMenu: PropTypes.func.isRequired,
    activeMenuKey: PropTypes.string.isRequired
};

export default SidenavCollapse;
