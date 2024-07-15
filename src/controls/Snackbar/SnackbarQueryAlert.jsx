import React from "react";
import useSnackbar from "../../hooks/useSnackbar.js";
import SnackbarAlert from "../../components/Snackbar/SnackbarAlert.jsx";
const SnackbarQueryAlert = () => {

    const { snackbar, hideSnackBar } = useSnackbar();

    console.log("SnackbarQueryAlert", snackbar);

    if (!snackbar || !snackbar.show) return null;

    return (
        <SnackbarAlert
            color={snackbar.severity}
            icon="check"
            title={snackbar.title}
            content={snackbar.content}
            dateTime={snackbar.dateTime}
            open={snackbar.show}
            onClose={hideSnackBar}
            close={hideSnackBar}
            bgWhite
        />
    );
};
export default SnackbarQueryAlert;
