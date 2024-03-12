'use client';
import * as React from 'react';

import Box from '@mui/material/Box';
import Chart from 'chart.js/auto'; // Add this line
import NavBar from '../../components/header/navBar';

import Script from 'next/script'
import { useState, useEffect } from 'react'
import { Toolbar } from '@mui/material';

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

    console.log("HERE: " + typeof(d));
  
    console.log(d.candidateID + "\n" + d.tally);
  
    const xValues = d.map(i=>i.candidateID);
    const yValues = d.map(i => i.tally);
    //const barColors = ["red", "green","blue","orange","brown"];


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
  
	function getBallotCandidates(ballotID){
    var url = `http://localhost:3000/api/general/getBallot?ballotID=${ballotID}`;
    runDBCallAsync(url);
  }

  const [data, setData] = useState(null)

 
  useEffect(() => {
    fetch(`http://localhost:3000/api/general/tallyVotes?ballotID=${1}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)

        console.log("Returned chart data")
        console.log(data);
      })
  }, [])
 

  if (!data) return <p>No chart data found</p>

  console.log(data)

  
  
  return (
    <Box component="main" sx={{ p: 3 }} style={{ height: 400, width: '100%' }}>
    <NavBar></NavBar>
    <Toolbar></Toolbar>
        {data.map( i => i.candidateID)}
        {data.map( i => i.tally)}
        
    	  <Script
        src="https://cdn.jsdelivr.net/npm/chart.js"
        strategy="lazyOnload"
        onLoad={() =>
          go(data )
        }//onload
      />
	
	  <div>
        <canvas id="myChart"></canvas>
    </div>
	  
    </Box>
	  

  );
}