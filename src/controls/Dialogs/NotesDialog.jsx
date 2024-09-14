import React, { useState } from "react";
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
import useDeleteClientNote from "../../api/clientNotes/useDeleteClientNote.js";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props}/>;
});

const NoteCard = ({ note, dateTime, onDismiss }) =>
    <Alert color="dark" dismissible onDismiss={onDismiss}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Typography variant="body2" color="white">
                {note}
            </Typography>
            <Divider sx={{ display:"flex", opacity: 1, width: "50%" }} />
            <Typography variant="caption" color="white">
                {`Created ${dayjs(dateTime).fromNow(dayjs(), true)} ago`}
            </Typography>
       
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
    const deleteClientNote = useDeleteClientNote();

    const [newNote, setNewNote] = useState("");

    const handleAddNote = () => {
        const dataToSubmit = {
            client: clientId,
            note: newNote.trim()
        };

        createClientNote.mutate(dataToSubmit, {
            onSuccess: () => {
                data.push({
                    note: dataToSubmit.note,
                    createdAt: dayjs()
                });
                setNewNote("");
            }
        });

    };

    const handleDismissNote = (record) => {
        console.log("handleDismissNote");
        deleteClientNote.mutate({ id: record._id }, {
            onSuccess: () => {
                data = data?.filter(note => note._id !== record._id);
            }
        });
    };

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
                        disabled={data?.length >= 4}
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
                        disabled={data?.length >= 4}
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
