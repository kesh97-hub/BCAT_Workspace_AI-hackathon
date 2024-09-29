import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, styled, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function MessageBox() {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [file, setFile ] = useState<File | null>(null);
    const [text, setText ] = useState<string>("");

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        setFile(selectedFile);
    }

    const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
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
            const response = await fetch("http://localhost:5000/fetch", {
                method: 'POST',
                body: 'formData',
            });

            const data = await response.json();
            console.log(data)

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
            <Button variant="contained" size="large" onClick={handleClickOpen}>Add Message</Button>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    sx: {width: 1200, height: 400 },
                    // onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    //     event.preventDefault();
                    //     const formData = new FormData(event.currentTarget);
                    //     const formJson = Object.fromEntries((formData as any).entries());
                    //     const message = formJson.Message;
                    //     console.log(message);
                    //     handleClose();
                    // },
                }}
            >
                <DialogTitle>Add Message</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText> */}
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
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                        Upload file
                        <VisuallyHiddenInput
                            type="file"
                            onChange={handleFileChange}
                            // multiple
                        />
                        </Button>
                    </Box>
                </Box>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
