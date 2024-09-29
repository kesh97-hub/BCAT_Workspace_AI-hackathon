'use client'

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link as LinkType } from '@/app/people/page';
import Link from '@mui/material/Link';
import { SiGmail, SiGooglechat, SiGooglemeet } from 'react-icons/si';
import { Badge } from '@mui/material';

// const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Logout'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const links: LinkType[] = [
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

function ResponsiveAppBar() {
//   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

//   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElNav(event.currentTarget);
//   };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#FDF7FF'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between'}}>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'black'}} /> */}
          <Typography variant="h4" fontWeight={700} color='black'>BCAT</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, flexGrow: 0, m: 1 }}>
            <Box sx={{display: 'flex', flexDirection: "row", gap: 2}}>
                {links.map((link, index) => (
                    <Box key={index} sx={{margin: 1}}>
                        {link.LinkName === "Google Mail" && <Link href={link.LinkURL}><Badge badgeContent={4} color="primary"><SiGmail color="#D93025" size={24}/></Badge></Link>}
                        {link.LinkName === "Google Meet" && <Link href={link.LinkURL}><Badge variant='dot' color="primary"><SiGooglemeet color="#00897B" size={24}/></Badge></Link>}
                        {link.LinkName === "Google Chat" && <Link href={link.LinkURL}><Badge badgeContent={2} color="primary"><SiGooglechat color="#FF0000" size={24}/></Badge></Link>}
                    </Box>
                ))}
            </Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;