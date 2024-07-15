import SnackbarAlert from "../components/Snackbar/SnackbarAlert.jsx";
import { createContext, useCallback, useState } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
    const [snackBar, setSnackBar] = useState({
        title: "",
        content: "",
        dateTime: new Date(),
        severity: "success",
        open: false
    });

    const showSnackBar = useCallback((title, content, severity, dateTime) => {
        setSnackBar({ title, content, severity, dateTime, open: true });
    },[]);

    const closeSnackBar = useCallback(() => {
        setSnackBar({ ...snackBar, open: false });
    },[]);

    const renderSnackbar = <SnackbarAlert
        color={snackBar.severity}
        icon="check"
        title={snackBar.title}
        content={snackBar.content}
        dateTime={dayjs(snackBar.dateTime).fromNow()}
        open={snackBar?.open}
        close={closeSnackBar}
        onClose={closeSnackBar}
    />;

    return (
        <SnackbarContext.Provider value={{ showSnackBar, closeSnackBar, snackBar }}>
            {children}
            {snackBar.open && renderSnackbar}
        </SnackbarContext.Provider>

    );
};

export { SnackbarContext };
