"use client"

import { Box, Button, FormControl, InputLabel, List, MenuItem, OutlinedInput, Select, SelectChangeEvent, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from "next/link";
import PeopleCard from "@/components/PeopleCard";
import { MenuProps, scopes } from "../page";
import React from "react";

const people = [
    {
        "FirstName": "Gokul",
        "LastName": "Ram",
        "TeamName": "Team Young",
        "EmailId": "gokul.ram@bcat.com",
        "ImageURL": "/path/to/image",
        "Links": [
            {
                "LinkName": "Google Mail",
                "LinkURL": "/link/to/GoogleMail"
            },
            {
                "LinkName": "Google Meet",
                "LinkURL": "/link/to/GoogleMeet"
            },
            {
                "LinkName": "Google Chat",
                "LinkURL": "/link/to/GoogleChat"
            },
        ]
    },
    {
        "FirstName": "Gokul",
        "LastName": "Ram",
        "TeamName": "Team Young",
        "EmailId": "gokul.ram@bcat.com",
        "ImageURL": "/path/to/image",
        "Links": [
            {
                "LinkName": "Google Mail",
                "LinkURL": "/link/to/GoogleMail"
            },
            {
                "LinkName": "Google Meet",
                "LinkURL": "/link/to/GoogleMeet"
            },
            {
                "LinkName": "Google Chat",
                "LinkURL": "/link/to/GoogleChat"
            },
        ]
    },
    {
        "FirstName": "Gokul",
        "LastName": "Ram",
        "TeamName": "Team Young",
        "EmailId": "gokul.ram@bcat.com",
        "ImageURL": "/path/to/image",
        "Links": [
            {
                "LinkName": "Google Mail",
                "LinkURL": "/link/to/GoogleMail"
            },
            {
                "LinkName": "Google Meet",
                "LinkURL": "/link/to/GoogleMeet"
            },
            {
                "LinkName": "Google Chat",
                "LinkURL": "/link/to/GoogleChat"
            },
        ]
    }
]


export type Link = {
    "LinkName": string,
    "LinkURL": string
}

export type EmployeeDetails = {
    "FirstName": string,
    "LastName": string,
    "TeamName": string,
    "EmailId": string,
    "ImageURL": string,
    "Links": Link[]
}

export default function People() {
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
        <div className="mx-48 my-2">
            <div className="flex items-center">
                <Button variant="outlined" size="small" sx={{ p:0, m: 1, width: 0, height: 1 }} >
                    <Link href={"/"}>
                        <ArrowBackIcon/>
                    </Link>
                </Button>
                <Box sx={{ py: 2 }}>
                    <Typography variant="h3">People</Typography>
                    <Typography variant="body1">Find people in your organization.</Typography>
                </Box>
            </div>

            <Box>
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
            </Box>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {people.map((person, index) => (
                    <PeopleCard key={index} details={person}/>
                ))}
            </List>
            
        </div>
    )
}