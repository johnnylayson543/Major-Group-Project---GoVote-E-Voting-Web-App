'use client';

// Import necessary components and libraries from Material-UI
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ListItemIcon from '@mui/material/ListItemIcon';


export default function NavBar({ window }) {

    //Set width and items within the navBar
    const drawerWidth = 240;
    const navItems = [

    ];

    // State to manage mobile open/close state
    const [mobileOpen, setMobileOpen] = useState(false);

    // Function to handle drawer toggle (open/close)
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };



    // Function to determine the destination link for each item in the navBar
    const getLinkDestination = (item) => {
        switch (item.text) {
            case 'Home':
                return '/';
            case 'About':
                return '/about';
            case 'Login':
                return '/User/login';
            case 'Register':
                return '/User/register';
            case 'Contact':
                return '/contact';
            default:
                return '#';
        }
    };

    // JSX for the drawer content
    const drawer = (
        <Box>
            <Typography variant="h6" sx={{ my: 2 }}>
                MUI
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center', color: '#FFFFFF' }} component={Link} to={getLinkDestination(item)}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    // Function to get the document body based on the window object
    const container = window !== undefined ? () => window().document.body : undefined;

    //JSX for the entire navBar
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <AppBar component="nav" color="primary" >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <ListItemIcon />
                    </IconButton>
                    <img src="/logo.png" alt="Logo of GoVote" style={{ marginRight: '10px', height: '40px' }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} fontWeight={600}>
                        GoVote
                    </Typography>
                    <IconButton size="small" edge="start" color="inherit" aria-label="holder" href="/">
                        <HomeIcon /> Home &ensp;
                    </IconButton>
                    <IconButton size="small" edge="start" color="inherit" aria-label="holder" href="/about">
                        <InfoIcon /> About &ensp;
                    </IconButton>
                    <IconButton size="small" edge="start" color="inherit" aria-label="holder" href="/contact">
                        <ContactSupportIcon/> Contact &ensp;
                    </IconButton>
                    <IconButton size="small" edge="start" color="inherit" aria-label="holder" href="/User/LoginUser">
                        <LoginIcon/> Login &ensp;
                    </IconButton>
                    <IconButton size="small" edge="start" color="inherit" aria-label="holder" href="/User/RegisterUser">
                        <AppRegistrationIcon/> Register &ensp;
                    </IconButton>


                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Link href={getLinkDestination(item)} key={item.text}>
                                <Button sx={{ color: '#fff' }}>{item.text}</Button>
                            </Link>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    );
}

// PropTypes for the NavBar
NavBar.propTypes = {
    window: PropTypes.object,
};
