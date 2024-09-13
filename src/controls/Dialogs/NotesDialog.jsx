import React, { useCallback, useState } from "react";
import dayjs from "dayjs";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid, Slide,
    TextField,
} from "@mui/material";
import Typography from "../../components/Typography/Typography.jsx";
import Button from "../../components/Button/Button.jsx";
import Box from "../../components/Box/Box.jsx";
import Alert from "../../components/Alert/Alert.jsx";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";
import useCreateClientNote from "../../api/clientNotes/useCreateClientNote.js";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props}/>;
});

const NoteCard = ({ note, dateTime, onDismiss }) => 
    <Alert color="dark" dismissible onClose={onDismiss}>
        <Box sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
            <Typography variant="body2" color="white">
                {note}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", my: 1 }}>
                <Divider sx={{ opacity: 1, width: "100%" }} />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Typography variant="caption" color="white">
                    {`Created ${dayjs(dateTime).fromNow(dayjs(), true)} ago`}
                </Typography>
            </Box>
        </Box>
    </Alert>
;
NoteCard.propTypes = {
    note: PropTypes.string,
    dateTime: PropTypes.string,
    onDismiss: PropTypes.func,
};

const NotesDialog = ({ openDialog, onClose, data, clientId }) => {
    const createClientNote = useCreateClientNote();
    const [newNote, setNewNote] = useState("");

    const handleAddNote = () => {
        const dataToSubmit = {
            client: clientId,
            note: newNote.trim()
        };

        createClientNote.mutate(dataToSubmit);
        if (!createClientNote.isPending && createClientNote.isSuccess){
            data.push({
                note: dataToSubmit.note,
                createdAt: dayjs()
            });
        }

        setNewNote("");
    };

    const handleDismissNote = useCallback((data) => {
        console.log("handleDismissNote", data);
    });

    const dialogContentToDisplay = () => {
        if (!data || data?.length === 0) {
            return <Typography variant={"body"}>No notes found</Typography>;
        }

        return (
            data?.map((d) =>
                <Grid item sx={12} md={12} lg={12} key={d}>
                    <NoteCard
                        note={d.note}
                        dateTime={d.createdAt}
                        onDismiss={() => handleDismissNote(d)}
                    />
                </Grid>
            )
        );
    };

    return (
        <Dialog
            open={openDialog}
            onClose={onClose}
            TransitionComponent={Transition}
            keepMounted
            fullWidth
        >
            <DialogTitle>Add or View Notes</DialogTitle>
            <DialogContent>
                <Box margin={2}>
                    <TextField
                        label={data?.length >= 4 ? "A maximum of 4 notes can be added" : "Add Note"}
                        placeholder={"Add a note"}
                        // disabled={data?.length >= 4}
                        multiline
                        required
                        rows={2}
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        fullWidth
                    />
                    <Button
                        onClick={handleAddNote}
                        color="primary"
                        // disabled={data?.length >= 4}
                        variant="contained"
                        sx={{ marginTop: 2 }}>
                        Add Note
                    </Button>
                </Box>
                
                <Grid container spacing={2} sx={{ marginTop: 2 }} display={"flex"} justifyContent={"center"}>
                    {dialogContentToDisplay()}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Back</Button>
            </DialogActions>
        </Dialog>
    );
};

NotesDialog.propTypes = {
    openDialog: PropTypes.bool,
    onClose: PropTypes.func,
    data: PropTypes.object,
    clientId: PropTypes.string,

};

export default NotesDialog;
