'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Chart from 'chart.js/auto'; // Add this line

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ThemeProvider } from '@mui/material/styles';

import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
import Script from 'next/script'
import { useState, useEffect } from 'react'

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



function go(d){


    const ctx = document.getElementById('myChart');


    const xValues = d.map(i => i.candidateID);
    const yValues = d.map(i => i.tally);
    const barColors = ["red", "green","blue","orange","brown"];


    let voteChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: xValues,
      datasets: [{
        label: '# of Votes',
        data: yValues,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
    });


}



export default function Page() {


  const theme = createTheme({
    palette: {
     
      secondary: {
        main: green[500],
      },
    },
  });
  
	function getBallotCandidates(ballotID){
    var url = `http://localhost:3000/api/general/getBallot?ballotID=${ballotID}`;
    runDBCallAsync(url);
  }

  const [data, setData] = useState(null)

 
  useEffect(() => {
    fetch(`http://localhost:3000/api/tallyVotes?ballotID=${1}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        console.log("Returned chart data")
        console.log(data);
      })
  }, [])
 

  if (!data) return <p>No chart data found</p>


  
  return (
    <ThemeProvider theme={theme}>
  
	  
	  <Script
        src="https://cdn.jsdelivr.net/npm/chart.js"
        strategy="lazyOnload"
        onLoad={() =>go(data.tally)
	
	
	
        }//onload
      />
	
	  <div>
        <canvas id="myChart"></canvas>
    </div>
	  

	  
    </ThemeProvider>

  );
}