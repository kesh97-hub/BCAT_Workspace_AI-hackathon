'use client'

import ResponsiveAppBar from "@/components/AppBar";
import MessageCard from "@/components/MessageCard";
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, InputLabel, MenuItem, OutlinedInput, Paper, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import MessageBox from "@/components/MessageBox";
import { active_messages_data, upcoming_messages_data } from "./lib/data/Messages";
import { events_data } from "./lib/data/Events";

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

export type Event = {
    "meeting_title": string,
    "meeting_date": string,
    "start_time": string,
    "meeting_venue": string,
}
  

export default function Home() {
    const [scope, setScope] = React.useState<string[]>([]);
    const [messages, setMessages] = useState<Message[]>(active_messages_data)
    const [events, setEvents] = useState<Event[]>(events_data)

    const handleScopeChange = (event: SelectChangeEvent<typeof scope>) => {
        const {
        target: { value },
        } = event;
        setScope(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleNewMessage = (newMessage: Message) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    const handleNewEvent = (newEvent: Event) => {
        setEvents((prevEvents) => [...prevEvents, newEvent])
    }
    
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
                    <Button variant="contained" size="large" sx={{ m: 1, bgcolor: "#65558F" }} >
                        <Link href={"/people"}>People</Link>
                    </Button>
                    <MessageBox onSubmit={handleNewMessage} onEventSubmit={handleNewEvent}/>
                    {/* <Button variant="contained" size="large" sx={{ m: 1 }}>Add Message</Button> */}
                </div>
                
                <Typography variant="h4">Active Projects</Typography>
                <Divider/>
                
                <div className="flex my-2">
                    {messages.map((message, index) => (
                        <MessageCard key={index} message={message}/>
                    ))}
                </div>
                
                <Typography variant="h4" sx={{ my: 1}}>Upcoming Projects</Typography>
                <Divider/>

                <div className="flex my-2">
                    {upcoming_messages_data.map((message, index) => (
                        <MessageCard key={index} message={message}/>
                    ))}
                </div>
            </div>
            <Paper className="justify-end self-center">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar defaultValue={dayjs('2024-09-29')} readOnly/>
                </LocalizationProvider>
                <Divider/>
                {events.map((event, index) => (
                    <Card key={index} sx={{ m: 1, p: 1}}>
                        <Typography variant="body1">{event.meeting_title}</Typography>
                        <Typography variant="body1">Venue: {event.meeting_venue}</Typography>
                        <Typography variant="body2">{event.start_time}</Typography>
                    </Card>
                ))}
            </Paper>
            
        </div>
    );
}


