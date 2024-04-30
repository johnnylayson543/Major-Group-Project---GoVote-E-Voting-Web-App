'use client';
import * as React from 'react';

import Box from '@mui/material/Box';

import { useState, useEffect, useContext, useRef } from 'react'
import { UserContext } from '@/app/components/header/userAuthentication';
import { useRouter } from 'next/navigation';
import { Button, Card, FormLabel, Tab, Table, TableBody, TableCell, TableHead, TableRow, Toolbar } from '@mui/material';
import { formatDateTime, objectIdToOKLCH } from '@/app/components/helpers';
import { Chart } from 'chart.js';


/*
After the submit handler calls the runDBCallAsync, this does the thing
This function does the actual work
calling the fetch to get things from the database.
*/
async function runDBCallAsync(url) {

    const res = await fetch(url);
    const data = await res.json();

    if (data.data == "valid") {
        console.log("see ballot is valid!")



    } else {

        console.log("see ballot is not valid!")
    }
}




export default function Page() {

    const { user, voter } = useContext(UserContext);
    const [ballot, setBallot] = useState(null);
    const [election, setElection] = useState(null);
    const [candidates_for_ballot, setBallotCandidates] = useState(null);
    const [tally_for_the_election, setTallyForElection] = useState(null);

    const router = useRouter();

    useEffect(() => {
        const { searchParams } = new URL(window.location.href);
        const ballot_id = searchParams.get('ballotID');
        const election_id = searchParams.get('electionID');



        fetch(`http://localhost:3000/api/database/controllers/Admin/Election/retrieve_the_election?ballotID=${ballot_id}`)
            .then((res) => res.json())
            .then((data) => {
                setElection(data.result);


                console.log("Election data");
                console.log(data.result);
            })



        fetch(`http://localhost:3000/api/database/controllers/Admin/Ballot/retrieve_the_ballot?ballotID=${ballot_id}`)
            .then((res) => res.json())
            .then((data) => {
                setBallot(data.result);

                console.log("Ballot data");
                console.log(data.result);
            })



        fetch(`http://localhost:3000/api/database/controllers/Admin/Candidate/retrieve_candidates_for_the_ballot?ballotID=${ballot_id}`)
            .then((res) => res.json())
            .then((data) => {
                setBallotCandidates(data.result);

                console.log("Ballot Candidates data")
                console.log(data.result);
            })
        // src\app\api\database\controllers\Teller\Election\Vote\retrieve_the_tally_for_the_election
        fetch(`http://localhost:3000/api/database/controllers/Teller/Election/Vote/retrieve_the_tally_for_the_election?electionID=${election_id}`)
            .then((res) => res.json())
            .then((data) => {
                setTallyForElection(data.result);

                console.log("Ballot Candidates data")
                console.log(data.result);
            })
      

    }, []);

   
    const chartRef = useRef(null);
    useEffect(() => {


        

        if (document.getElementById('myChart') && candidates_for_ballot && tally_for_the_election) {
            var ctx = document.getElementById('myChart').getContext('2d');
            chartRef.current = new Chart(ctx, {
                type: 'bar',
                data: chart_data,
                options: {
                    scales: {
                        y: {
                            beginsAtZero: true
                        }
                    }
                }
            });
        }

    }, [candidates_for_ballot, tally_for_the_election]);


    const handleSubmit = (event) => {

        console.log("handling submit");


        event.preventDefault();

        // Call this function to pass the data created by the FormData
        // src\app\api\database\controllers\Admin\Ballot\create_ballot
        goBack();

    }; // end handler


    const goBack = () => {
        router.push('/Voter/Profile/');
    };

    if (!ballot || !candidates_for_ballot || !election || !voter || !tally_for_the_election) return <p>No ballot or candidates_for_ballot or election found. </p>;


    let voterButton;
    if (voter) {
        console.log(voter._id);
        voterButton = <button onClick={() => goBackToSignedUpElections(voter._id)}>Back to My Signed Up Elections</button>;
    }

    let dataElement1 = <Table className='dataElement' key={ballot._id.toString()} style={{ backgroundColor: objectIdToOKLCH(ballot._id) }}>
        <TableBody>
            <TableRow><TableCell><details><summary>id</summary><FormLabel>id:</FormLabel><Tab></Tab>{ballot._id}</details></TableCell></TableRow>
            <TableRow><TableCell><FormLabel>Closing date:</FormLabel><Tab></Tab>{formatDateTime(ballot.closing_datetime)}</TableCell></TableRow>
            <TableRow><TableCell><FormLabel>Title:</FormLabel><Tab></Tab> {ballot.title}</TableCell></TableRow>
        </TableBody>
    </Table>
        ;
    let dataElement2 = (candidates_for_ballot.map(ballot_candidate =>
        <TableRow key={ballot_candidate._id.toString()} style={{ backgroundColor: objectIdToOKLCH(ballot_candidate._id) }}><TableCell><details><summary>id</summary><strong>candidate_id: </strong>{ballot_candidate._id}<br /><strong>ballot_id: </strong>{ballot_candidate.ballotID}</details></TableCell><TableCell>{ballot_candidate.person_ppsn}</TableCell></TableRow>
    ));

    let dataElement3 =
        <TableRow key={election._id} style={{ backgroundColor: objectIdToOKLCH(election._id) }}><TableCell><details><summary>id</summary><strong>election_id: </strong>{election._id}<br /><strong>ballot_id: </strong>{election.ballotID}</details></TableCell></TableRow>

        ;

    let dataElement4 =
        <TableRow key={tally_for_the_election._id} style={{ backgroundColor: objectIdToOKLCH(tally_for_the_election._id) }}><TableCell><details><summary>id</summary><strong>election_id: </strong>{tally_for_the_election._id}<br /><strong>tally_id: </strong>{tally_for_the_election.electionID}</details></TableCell>
            <TableCell>{tally_for_the_election.tally.map(x => <div key={x._id} ><p>CandidateID: {x.candidateID}</p><p>Count: {x.count}</p></div>)}</TableCell></TableRow>

        ;

    let element = <Box>

        <Card>
            <canvas id='myChart'></canvas>
        </Card>

    </Box>

let chart_data = {
    labels: tally_for_the_election.tally
      .filter(item => typeof item.candidateID !== 'undefined' && typeof item.count !== 'undefined')
      .map(x => x.candidateID),
    datasets: [
      {
        label: 'Election Tally',
        data: tally_for_the_election.tally
          .filter(item => typeof item.count !== 'undefined')
          .map(x => x.count)
      }
    ]
  };


    const goBackToTalliedElections = () => {
        router.push('/Teller/Election/Vote');
    };
    const goBackToProfile = () => {
        router.push('/Teller/Profile/');
    };
    const goBackToFinishedElections = (voter_id) => {
        router.push('/Teller/Election/');
    };

    
    return (
        <>
            <Box component="main" sx={{ p: 3 }} style={{ height: 400, width: '100%' }}>
                {element}
            </Box>
        </>

    );

    
}