import { useContext } from "react";
import { SnackbarContext } from "../context/snackbar-provider.jsx";

const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (context === undefined) {
        throw new Error("useSnackbar must be used within a SnackbarProvider");
    }
    return context;
};

export default useSnackbar;