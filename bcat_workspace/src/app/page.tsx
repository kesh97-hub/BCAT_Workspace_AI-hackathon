'use client'

import ResponsiveAppBar from "@/components/AppBar";
import MessageCard from "@/components/MessageCard";
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, InputLabel, MenuItem, OutlinedInput, Paper, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import dayjs from "dayjs";
import React from "react";
import Link from "next/link";
import InputFileUpload from "@/components/FileUpload";
import MessageBox from "@/components/MessageBox";

export const ITEM_HEIGHT = 48;
export const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const scopes = [
    'General',
    'Youth',
    'Adult',
];

export type Message = {
    "Title": string,
    "Message": string,
    "Link": string,
}

const messages = [
    {
        "Title": "ABC",
        "Message": "This is message for ABC.",
        "Link": ""
    },
    {
        "Title": "LMN",
        "Message": "This is message for LMN",
        "Link": ""
    },
    {
        "Title": "XYZ",
        "Message": "This is message for XYZ",
        "Link": ""
    },
];

const events = [
    {
        "start_time": "8 AM",
        "meeting_title": "Meeting 1"
    },
    {
        "start_time": "10 AM",
        "meeting_title": "Meeting 2"
    },
    {
        "start_time": "10:30 AM",
        "meeting_title": "Meeting 3"
    }
]
  

export default function Home() {
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

    
    
    return (
        <div className="grid grid-cols-[1fr_auto] mx-48 gap-20">
            <div className="block">
                <div className="flex items-center">
                    <FormControl sx={{ m: 1, width: 300}} className="my-12">
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
                    <Button variant="contained" size="large" sx={{ m: 1 }} >
                        <Link href={"/people"}>People</Link>
                    </Button>
                    <MessageBox/>
                    {/* <Button variant="contained" size="large" sx={{ m: 1 }}>Add Message</Button> */}
                </div>
                
                <Typography variant="h4">Ongoing Events</Typography>
                <Divider/>
                
                <div className="flex my-2">
                    {messages.map((message, index) => (
                        <MessageCard key={index} message={message}/>
                    ))}
                </div>
                
                <Typography variant="h4" sx={{ my: 1}}>Upcoming Projects</Typography>
                <Divider/>

                <div className="flex my-2">
                    {messages.map((message, index) => (
                        <MessageCard key={index} message={message}/>
                    ))}
                </div>
            </div>
            <Paper className="justify-end self-center">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar defaultValue={dayjs('2022-04-17')} readOnly/>
                </LocalizationProvider>
                <Divider/>
                {events.map((event, index) => (
                    <Card key={index} sx={{ m: 1, p: 1}}>
                        <Typography variant="body2">{event.start_time}</Typography>
                        <Typography variant="body1">{event.meeting_title}</Typography>
                    </Card>
                ))}
            </Paper>
            
        </div>
    );
}


