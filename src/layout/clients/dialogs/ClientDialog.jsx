import React from "react";
import { CircularProgress, Dialog, DialogActions, DialogTitle, Slide } from "@mui/material";
import Box from "../../../components/Box/Box.jsx";
import Icon from "@mui/material/Icon";
import Typography from "../../../components/Typography/Typography.jsx";
import PropTypes from "prop-types";
import AddEditCheckin from "../../checkins/dialogs/AddEditCheckin.jsx";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props}/>;
});

const ClientDialog = ({ openDialog, icon, onClose, title, isLoading, children }) => {
    return (
        <>
            <Dialog
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={onClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <Box className={"p-5"}>
                    <DialogTitle>
                        <Box className={"flex justify-center"}>
                            <Icon color={"secondary"} sx={{ mr: 1 }}>{icon}</Icon>
                            <Typography variant="h6">{title}</Typography>
                        </Box>
                    </DialogTitle>
                    <DialogActions>
                        {<Box display="flex" justifyContent="center" width="100%" mb={2}>
                            {isLoading && <CircularProgress />}
                            {!isLoading &&
                  <>
                      {children}
                  </>
                            }
                        </Box>}
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    );
};

ClientDialog.propTypes = {
    openDialog: PropTypes.bool,
    onClose: PropTypes.func,
    title: PropTypes.string,
    icon: PropTypes.string,
    isLoading: PropTypes.bool,
    children: PropTypes.node
};

export default ClientDialog;
