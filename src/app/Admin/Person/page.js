'use client';
import * as React from 'react';

import Box from '@mui/material/Box';
import Chart from 'chart.js/auto'; // Add this line
import Header from '../../components/header/header';

import Script from 'next/script'
import { useState, useEffect } from 'react'
import { Toolbar } from '@mui/material';
import { useRouter } from 'next/navigation';

  /*
  After the submit handler calls the runDBCallAsync, this does the thing
  This function does the actual work
  calling the fetch to get things from the database.
  */ 
  async function runDBCallAsync(url) {

    const res = await fetch(url);
    const data = await res.json();
 
    if(data.data== "valid"){
      console.log("login is valid!")


      
    } else {

      console.log("login is not valid!")
    }
  }




export default function Page() {
  
  const router = useRouter();

 
  //if (!ballots) return <p>No ballots found. </p>;


  let element = <Box>
        <h1>Person Settings</h1>

            <p><button onClick={() => goSetPersonsPPSNRange()}>Set PPSN range</button></p>

            <p>
            <button onClick={() => goBackToProfile()}>Back to Profile</button>
            <button onClick={() => goToElections()}>Back to Elections</button>
            <button onClick={() => goToBallots()}>Back to Ballots</button></p>
  </Box>

  const goBackToProfile = () => {
    router.push('/Admin/');
  };
  const goToElections = () => {
    router.push('/Admin/Election/');
  };

  const goToBallots = () => {
    router.push('/Admin/Ballot/');
  };

  const goSetPersonsPPSNRange = () => {
    router.push('/Admin/Person/SetPersonsPPSNRange/');
  };

  

  
  return (
    
    <Box component="main" sx={{ p: 3 }} style={{ height: 400, width: '100%' }}>
        
    <Header></Header>
    <Toolbar></Toolbar>
        { element }
    </Box>
	  

  );
}