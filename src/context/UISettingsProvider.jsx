import { createContext, useContext, useReducer, useMemo } from "react";
import PropTypes from "prop-types";

const UISettingsContext = createContext();

UISettingsContext.displayName = "UISettingsContext";

function reducer(state, action) {
    switch (action.type) {
    case "MINI_SIDENAV": {
        return { ...state, miniSidenav: action.value };
    }
    case "TRANSPARENT_SIDENAV": {
        return { ...state, transparentSidenav: action.value };
    }
    case "WHITE_SIDENAV": {
        return { ...state, whiteSidenav: action.value };
    }
    case "SIDENAV_COLOR": {
        return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
        return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
        return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
        return { ...state, openConfigurator: action.value };
    }
    case "LAYOUT": {
        return { ...state, layout: action.value };
    }
    case "DARKMODE": {
        return { ...state, darkMode: action.value };
    }
    default: {
        throw new Error(`Unhandled action type: ${action.type}`);
    }
    }
}

function UISettingsProvider({ children }) {
    const initialState = {
        miniSidenav: false,
        transparentSidenav: false,
        whiteSidenav: false,
        sidenavColor: "primary",
        transparentNavbar: true,
        fixedNavbar: true,
        openConfigurator: false,
        layout: "dashboard",
        darkMode: false,
    };

    const [controller, dispatch] = useReducer(reducer, initialState);

    const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

    return <UISettingsContext.Provider value={value}>{children}</UISettingsContext.Provider>;
}

function useUISettingsController() {
    const context = useContext(UISettingsContext);

    if (!context) {
        throw new Error(
            "useUISettingsController should be used inside the UISettingsProvider."
        );
    }

    return context;
}

UISettingsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

const setMiniSidenav = (dispatch, value) => dispatch({ type: "MINI_SIDENAV", value });
const setTransparentSidenav = (dispatch, value) => dispatch({ type: "TRANSPARENT_SIDENAV", value });
const setWhiteSidenav = (dispatch, value) => dispatch({ type: "WHITE_SIDENAV", value });
const setSidenavColor = (dispatch, value) => dispatch({ type: "SIDENAV_COLOR", value });
const setTransparentNavbar = (dispatch, value) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
const setFixedNavbar = (dispatch, value) => dispatch({ type: "FIXED_NAVBAR", value });
const setOpenConfigurator = (dispatch, value) => dispatch({ type: "OPEN_CONFIGURATOR", value });
const setLayout = (dispatch, value) => dispatch({ type: "LAYOUT", value });
const setDarkMode = (dispatch, value) => dispatch({ type: "DARKMODE", value });

export {
    UISettingsProvider,
    useUISettingsController,
    setMiniSidenav,
    setTransparentSidenav,
    setWhiteSidenav,
    setSidenavColor,
    setTransparentNavbar,
    setFixedNavbar,
    setOpenConfigurator,
    setLayout,
    setDarkMode,
};
