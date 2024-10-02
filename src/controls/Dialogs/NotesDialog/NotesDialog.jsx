import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid, Icon, ListItemButton, Slide,
    TextField,
} from "@mui/material";
import Typography from "../../../components/Typography/Typography.jsx";
import Button from "../../../components/Button/Button.jsx";
import Box from "../../../components/Box/Box.jsx";
import Alert from "../../../components/Alert/Alert.jsx";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";
import { useClientNote, useDeleteClientNote } from "../../../api/clientNotes/useClientNoteMutation.js";
import { useForm } from "react-hook-form";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props}/>;
});

const NoteListItem = ({ note, dateTime, onDismiss, disableItem }) =>
    <ListItem disablePadding>
        <ListItemButton onClick={onDismiss} disabled={disableItem}>
            <ListItemIcon>
                <Icon fontSize={"large"}>{disableItem ? "pending" : "edit_note"}</Icon>
            </ListItemIcon>
            <ListItemText
                primary={<Typography variant="body2">
                    {note}
                </Typography>}
                secondary={
                    <Typography variant="caption">
                        {`Created ${dayjs(dateTime).fromNow(dayjs(), true)} ago`}
                    </Typography>}/>
        </ListItemButton>
    </ListItem>;

NoteListItem.propTypes = {
    note: PropTypes.string,
    dateTime: PropTypes.string,
    onDismiss: PropTypes.func,
    disableItem: PropTypes.bool
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
        console.log(record);
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
            <List sx={{ px:2 }}>
                {notesData.map(record =>
                    <NoteListItem key={record._id}
                        note={record.note}
                        dateTime={record.createdAt}
                        disableItem={deleteClientNote.isPending && deleteClientNote.context.data.id === record._id}
                        onDismiss={() => handleDeleteNote(record)}/>
                )}
            </List>
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
                            variant={"standard"}
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

                        {createClientNote.isPending ?
                            <CircularProgress/> :
                            <Button
                                type={"submit"}
                                color="primary"
                                disabled={notesData?.length >= 4}
                                variant="contained"
                                sx={{ marginTop: 2 }}>
                            Add Note
                            </Button>
                        }
                    </form>
                </Box>
                <Divider/>
                <Box>
                    {dialogContentToDisplay()}
                </Box>

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
