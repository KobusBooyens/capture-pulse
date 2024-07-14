import React, { createContext, useState } from "react";
import SnackbarAlert from "../components/Snackbar/SnackbarAlert.jsx";
import dayjs from "dayjs";

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
    const [snackBar, setSnackBar] = useState({
        title: "",
        content: "",
        severity: "success",
        dateTime: dayjs().format("YYYY-MM-DD"),
        open: false
    });

    const showSnackBar = (title, content, severity, dateTime) => {
        setSnackBar({ title, content, severity, dateTime, open: true });
    };

    const closeSnackBar = () => {
        setSnackBar({ ...snackBar, open: false });
    };

    const renderSnackbar = <SnackbarAlert
        color={snackBar.severity}
        icon="check"
        title={snackBar.title}
        content={snackBar.content}
        dateTime={"11s ago"}
        open={snackBar.open}
        close={closeSnackBar}
        onClose={closeSnackBar}
    />;

    return (
        <SnackbarContext.Provider value={{ showSnackBar, closeSnackBar }}>
            {children}
            {snackBar.open && renderSnackbar}
        </SnackbarContext.Provider>

    );
};

export { SnackbarContext };
