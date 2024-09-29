import React, { useState } from "react";
import {
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
} from "@mui/material";
import Box from "../../components/Box/Box.jsx";
import Icon from "@mui/material/Icon";
import Typography from "../../components/Typography/Typography.jsx";
import Button from "../../components/Button/Button.jsx";
import PropTypes from "prop-types";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props}/>;
});

const DeleteDialog = ({ openDialog, onClose, onConfirm, isLoading, contentTextValue }) => {

    const [contentText, setContextText] = useState(contentTextValue || "Are you sure you want to permanently " +
      "delete this record? This action cannot be undone.");

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
                            <Icon color={"warning"} sx={{ mr: 1 }} >warning_amber</Icon>
                            <Typography variant="h6">Confirm Deletion</Typography>
                        </Box>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {contentText}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Box display="flex" justifyContent="center" width="100%" mb={2}>
                            {isLoading && <CircularProgress/>}
                            {!isLoading &&
                            <>
                                <Button onClick={onConfirm}
                                    color="primary"
                                    sx={{ mx: 1 }}>
                                    YES
                                </Button>
                                <Button onClick={onClose}
                                    color="error"
                                    sx={{ mx: 1 }}>
                                    NO
                                </Button>
                            </>
                            }
                        </Box>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    );
};

DeleteDialog.propTypes = {
    openDialog: PropTypes.bool,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
    isLoading: PropTypes.bool,
    contentTextValue: PropTypes.string
};

export default DeleteDialog;
