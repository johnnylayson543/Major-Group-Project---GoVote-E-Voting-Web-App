'use client'
import React from 'react';
import {useEffect} from 'react';
import NavBar from '../header/navBar'; // Adjust the path based on your project structure
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Script from 'next/script';
import Chart from 'chart.js/auto'; // Add this line


/*
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ButtonBase from '@material-ui/core/ButtonBase';
*/

global.mongoURL = "mongodb+srv://evote.kyxphj1.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority";


export default function page() {

        const loadTheChart = () => {
            const ctx = document.getElementById('myChart');
            const existingChart = Chart.getChart(ctx); // Get the existing Chart instance
      
            if (existingChart) {
              // If an existing Chart instance is found, destroy it
              existingChart.destroy();
            }
    
          let voteChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['Leo Varadkar', 'Michael Martin', 'Richard Barrett', 'Mary Lou McDonald'],
              datasets: [{
                label: '# of Votes',
                data: [10, 55, 2, 4],
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
        } // end loadTheChart function
    
    return (

        <Box component="main" sx={{ p: 3 }}>
            <NavBar/>
            <Toolbar/>

            <Script src="https://cdn.jsdelivr.net/npm/chart.js" strategy='lazyOnload' onLoad={() => loadTheChart()}/>

            <Typography>
                Tally Votes Page
            </Typography>

            <div>
                <canvas id ="myChart"></canvas>
            </div>
        </Box>
    );

}