import {NavBar} from "navBar";
import {UserAuthentication } from "userAuthentication";
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';


export default function NavBar({ window }) {


    return ( 
        <Box>
            <NavBar></NavBar> 
            <UserAuthentication></UserAuthentication>

        </Box>
    );
}