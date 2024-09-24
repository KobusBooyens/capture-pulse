import React, { useEffect, useState } from "react";
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
import { useClientNote, useDeleteClientNote } from "../../api/clientNotes/useClientNoteMutation.js";
import { useForm } from "react-hook-form";

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
    const createClientNote = useClientNote();
    const deleteClientNote = useDeleteClientNote();

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [notesData, setNotesData] = useState([]);

    useEffect(() => {
        setNotesData(data);
    },[data]);

    const handleAddNote = (formData) => {
        const dataToSubmit = {
            client: clientId,
            note: formData.note.trim()
        };

        createClientNote.mutate(dataToSubmit, {
            onSuccess: (addedRecord) => {
                setNotesData((prevNotes) => [
                    ...prevNotes,
                    {
                        _id: addedRecord._id,
                        note: dataToSubmit.note,
                        createdAt: addedRecord.createdAt,
                    },
                ]);
                reset();
            },

        });
    };

    const handleOnClose = () => {
        reset();
        onClose();
    };

    const handleDeleteNote = (record) => {
        deleteClientNote.mutate({ id: record._id }, {
            onSuccess: () => {
                setNotesData((prevNotes) =>
                    prevNotes.filter((note) => note._id !== record._id)
                );
            }
        });
    };

    const dialogContentToDisplay = () => {
        if (!notesData || notesData?.length === 0) {
            return <Typography variant={"body"}>No notes found</Typography>;
        }

        return (
            notesData?.map((d) =>
                <Grid item sx={6} md={8} lg={12} key={d}>
                    <NoteCard
                        note={d.note}
                        dateTime={d.createdAt}
                        onDismiss={() => handleDeleteNote(d)}
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
                    <form onSubmit={handleSubmit(handleAddNote)} noValidate>
                        <TextField
                            label={"Add Note"}
                            placeholder={"Add a note"}
                            disabled={notesData?.length >= 4}
                            multiline
                            required
                            rows={2}
                            fullWidth
                            {...register("note", {
                                required: "This is a required field",
                                maxLength: {
                                    value: 100,
                                    message: "Cannot exceed 100 characters"
                                }
                            })}
                            error={!!errors.note}
                            helperText={notesData?.length >= 4 ? "A maximum of 4 notes can be added" :
                                errors.note ? errors.note.message :
                                    "Maximum of 100 characters"}
                        />
                        <Button
                            type={"submit"}
                            color="primary"
                            disabled={notesData?.length >= 4}
                            variant="contained"
                            sx={{ marginTop: 2 }}>
                            Add Note
                        </Button>
                    </form>
                </Box>

                <Grid container spacing={2} sx={{ marginTop: 2 }} display={"flex"} justifyContent={"center"}>
                    {dialogContentToDisplay()}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleOnClose} color="secondary">Back</Button>
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
