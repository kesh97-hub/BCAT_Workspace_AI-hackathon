import { EmployeeDetails } from "@/app/people/page";
import Link from '@mui/material/Link';
import { Avatar, Box, Card, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { SiGmail, SiGooglemeet, SiGooglechat } from "react-icons/si";
import React from "react";

interface PeopleCardProps {
    "details": EmployeeDetails
}

export default function PeopleCard({details} : PeopleCardProps) {
    return (
        <ListItem alignItems="flex-start" sx={{ alignItems: "center", flex: 1, flexGrow: 1}}>
            <ListItemAvatar>
                <Avatar alt="GR" src={details.ImageURL}></Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={details.FirstName + " " + details.LastName}
                secondary={
                    <React.Fragment>
                        <Typography variant="body1" sx={{fontSize: 12}}>{details.TeamName}</Typography>
                        <Box sx={{display: 'flex', flexDirection: "row", gap: 2}}>
                            {details.Links.map((link, index) => (
                                <Box key={index} sx={{margin: 1}}>
                                    {link.LinkName === "Google Mail" && <Link href={link.LinkURL}><SiGmail color="#D93025" size={24}/></Link>}
                                    {link.LinkName === "Google Meet" && <Link href={link.LinkURL}><SiGooglemeet color="#00897B" size={24}/></Link>}
                                    {link.LinkName === "Google Chat" && <Link href={link.LinkURL}><SiGooglechat color="#FF0000" size={24}/></Link>}
                                </Box>
                            ))}
                        </Box>
                        <Divider/>
                    </React.Fragment>
                }
            >

            </ListItemText>

        </ListItem>
    )
}
