import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, styled, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Event, MenuProps, Message, scopes } from "@/app/page";
import { headers } from "next/headers";
import axios from "axios";
import { active_messages_data } from "@/app/lib/data/Messages";

interface MessageBoxProps {
    onSubmit: (newMessage: Message) => void;
    onEventSubmit: (newEvent: Event) => void;
}

export default function MessageBox( { onSubmit, onEventSubmit }: MessageBoxProps) {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [file, setFile ] = useState<File | null>(null);
    const [text, setText ] = useState<string>("");
    const [isNewEvent, setIsNewEvent] = useState<boolean>(false);
    const [newEvent, setNewEvent ] = useState<Event>({
        meeting_title: "",
        start_time: "",
        meeting_date: "",
        meeting_venue: ""
    });

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        setFile(selectedFile);
    }

    const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    }

    const [scope, setScope] = React.useState<string[]>([]);

    const handleScopeChange = (event: SelectChangeEvent<typeof scope>) => {
        const {
        target: { value },
        } = event;
        setScope(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleEventChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setNewEvent((prev) => ({
            ...prev,
            [name]: value,
        }) )
    }

    const handleEventSchedulerClose = () => {
        setIsNewEvent(false);
        setNewEvent({
            meeting_title: "",
            start_time: "",
            meeting_date: "",
            meeting_venue: ""
        });
    }

    const handleEventSchedulerSubmit = () => {
        onEventSubmit(newEvent)
        setIsNewEvent(false);
        setNewEvent({
            meeting_title: "",
            start_time: "",
            meeting_date: "",
            meeting_venue: ""
        });
    }

    const handleSubmit = async (): Promise<void> => {
        const formData = new FormData();

        if (file) {
            formData.append('file', file);
        }
        else {
            formData.append('text', text);
        }

        try {
            console.log(formData.get('file'));
            const response = await axios.post("http://127.0.0.1:5000/fetch", formData, {
                headers: {
                    "Content-type": "multipart/form-data",
                }
            })

            const data = await response.data;
            let parsedData;
            if (typeof data === 'string') {
                try {
                    parsedData = JSON.parse(data);
                }
                catch(error) {
                    throw new Error('Failed to parse response data as JSON');
                }
            }
            else {
                parsedData = data
            }
            
            console.log(parsedData)
            if (parsedData.date_of_event !== null) {
                const event: Event = {
                    "meeting_title": parsedData.title as string,
                    "meeting_date": parsedData.date_of_event as string,
                    "start_time": "2:00 PM",
                    "meeting_venue": parsedData.venue as string,
                }
                setIsNewEvent(true);
                setNewEvent(event);
            }
            
            const newMessage = {
                "Title": parsedData.title,
                "Message": parsedData.summary,
                "Link": ""
            }
            console.log(newMessage)
            
            onSubmit(newMessage)
            console.log(active_messages_data)

            setOpenDialog(false);
            setFile(null);
            setText("");
        } catch (error) {
            console.error("Error uploading file: ", error);
        }
    }

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
        setFile(null);
        setText("");
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });


    return (
        <React.Fragment>
            <Button variant="contained" size="large" onClick={handleClickOpen} sx={{ bgcolor: "#65558F"}}>Add Message</Button>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    sx: {width: 1200, height: 600 }
                }}
            >
                <DialogTitle>Add Message</DialogTitle>
                <DialogContent >
                    {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText> */}
                    <FormControl sx={{ margin: 0, width: 300}} className="my-1">
                        <InputLabel id="demo-multiple-name-label">Scope</InputLabel>
                        <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        value={scope}
                        onChange={handleScopeChange}
                        input={<OutlinedInput label="Name" />}
                        MenuProps={MenuProps}
                        >
                        {scopes.map((scope) => (
                            <MenuItem
                            key={scope}
                            value={scope}
                            // style={getStyles(name, personName, theme)}
                            >
                            {scope}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="message"
                        name="Message"
                        label="Write your message!"
                        fullWidth
                        variant="outlined"
                        rows={6}
                        multiline
                        onChange={handleTextChange}
                    />
                </DialogContent>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", justifySelf: "center", gap: 3}}>
                    <Typography variant="body2">or</Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap:2}}>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                            sx={{
                                bgcolor: "#65558F"
                            }}
                        >
                        Upload file
                        <VisuallyHiddenInput
                            type="file"
                            onChange={handleFileChange}
                            // multiple
                        />
                        </Button>
                        {file && (
                            <Typography>Uploaded File: {file.name}</Typography>
                        )}
                    </Box>
                </Box>
                <DialogActions>
                    <Button onClick={handleClose} sx={{color: "#65558F"}}>Cancel</Button>
                    <Button onClick={handleSubmit} sx={{color: "#65558F"}}>Submit</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={isNewEvent}
                onClose={handleEventSchedulerClose}
                PaperProps={{
                    component: 'form',
                    sx: {width: 1200, height: 350 }
                }}
            >
                <DialogTitle>Found the following event in the message. Do you want to add it to the calendar?</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText> */}
                    {/* <FormControl sx={{ margin: 0, width: 300}} className="my-1">
                        <InputLabel id="demo-multiple-name-label">Scope</InputLabel>
                        <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        value={scope}
                        onChange={handleScopeChange}
                        input={<OutlinedInput label="Name" />}
                        MenuProps={MenuProps}
                        >
                        {scopes.map((scope) => (
                            <MenuItem
                            key={scope}
                            value={scope}
                            // style={getStyles(name, personName, theme)}
                            >
                            {scope}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl> */}
                    <TextField
                        margin="dense"
                        id="meeting_name"
                        name="Meeting Name"
                        variant="outlined"
                        onChange={handleEventChange}
                        value={newEvent?.meeting_title}
                        label= "Meeting Name"
                        sx={{ margin: 1}}
                    />
                    <TextField
                        margin="dense"
                        id="meeting_date"
                        name="Meeting Date"
                        variant="outlined"
                        onChange={handleEventChange}
                        value={newEvent?.meeting_date}
                        label= "Meeting Date"
                        sx={{ margin: 1}}
                    />
                    <TextField
                        margin="dense"
                        id="meeting_time"
                        name="Meeting Time"
                        variant="outlined"
                        onChange={handleEventChange}
                        value={newEvent?.start_time}
                        label= "Meeting Time"
                        sx={{ margin: 1}}
                    />
                    <TextField
                        margin="dense"
                        id="meeting_venue"
                        name="Meeting Venue"
                        variant="outlined"
                        onChange={handleEventChange}
                        value={newEvent?.meeting_venue}
                        label= "Meeting Venue"
                        sx={{ margin: 1}}
                    />
                </DialogContent>
                <DialogActions sx={{ margin: 1}}>
                    <Button onClick={handleEventSchedulerClose} variant="contained" color="error">No</Button>
                    <Button onClick={handleEventSchedulerSubmit} variant="contained" color="success">Yes</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
