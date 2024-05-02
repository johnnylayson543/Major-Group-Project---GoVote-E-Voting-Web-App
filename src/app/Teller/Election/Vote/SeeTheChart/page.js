'use client';

import Box from '@mui/material/Box';

import { UserContext } from '@/app/components/header/userAuthentication';
import { Button, Card } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { MyTallyChart } from '@/app/components/tallyChart'


export default function Page() {

    const { user, voter } = useContext(UserContext);
    const [ballot, setBallot] = useState(null);
    const [election, setElection] = useState(null);
    const [candidates_for_ballot, setBallotCandidates] = useState(null);
    const [tally_for_the_election, setTallyForElection] = useState(null);
    const [labels1, setLabels1] = useState(null);

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

                console.log("Tally data")
                console.log(data.result);
            })

        // src\app\api\database\controllers\Teller\Candidate\get_labels_for_the_chart
        fetch(`http://localhost:3000/api/database/controllers/Teller/Candidate/get_labels_for_the_chart?electionID=${election_id}`)
            .then((res) => res.json())
            .then((data) => {
                setLabels1(data.result);

                console.log("Labels data");
                console.log(data.result);
            })




    }, []);



    if (!ballot || !candidates_for_ballot || !election || !voter || !tally_for_the_election || !labels1) return <Box><p>No ballot or candidates_for_ballot or election found. </p></Box>;


    let voterButton;
    if (voter) {
        console.log(voter._id);
        voterButton = <button onClick={() => goBackToSignedUpElections(voter._id)}>Back to My Signed Up Elections</button>;
    }

    if (document.getElementById('myChart')) var ctx = document.getElementById('myChart').getContext('2d');


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
            <Box>
                <Box>
                    <Card>
                        <MyTallyChart tally={tally_for_the_election} candidateLabels={labels1} />
                    </Card>
                </Box>
                <Box><Button onClick={() => goBackToFinishedElections()}>Tallied Elections</Button></Box>

                <Box>
                    <Button onClick={() => goBackToProfile()}>Back to Profile</Button>
                    <Button onClick={() => goBackToFinishedElections()}>Back to Finished Elections</Button></Box>
            </Box>
        </>
    );


}