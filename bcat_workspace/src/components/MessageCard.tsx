import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Link, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Message } from '@/app/page';

interface MessageCardProps {
    message: Message
}

export default function MessageCard( {message} : MessageCardProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 256,
          height: 256,
        },
      }}
    >
      <Paper elevation={3} sx={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', p: 2}}>
        <Typography variant='h3' sx={{ textWrap: 'wrap'}}>{message.Title}</Typography>
        <Typography variant='body1' sx={{ textWrap: 'wrap'}}>{message.Message}</Typography>
        <Link href={message.Link} underline="hover" sx={{ display: 'flex', justifySelf: 'end',  alignSelf: 'end', alignItems: 'center'}}>
            <Typography variant='body2'>Read More</Typography>
            <NavigateNextIcon >Read More</NavigateNextIcon>
        </Link>
        
      </Paper>

    </Box>
  );
}