import { Button, Card, FormLabel, Tab, Table, TableBody, TableCell, TableHead, TableRow, Toolbar } from '@mui/material';
import { formatDateTime, objectIdToOKLCH } from '@/app/components/helpers';

export function getBallots(){
  const [ballots, setBallots] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:3000/api/database/controllers/Admin/Ballot/retrieve_ballots`)
      .then((res) => res.json())
      .then((data) => {
        setBallots(data.result);

        console.log("Ballot data")
        console.log(data.result);
      })
  }, []);

    return ballots;
}


export function get(){
    let dataElement2 = (candidates_for_ballot.map(ballot_candidate =>
        <TableRow key={ballot_candidate._id.toString()} style={{ backgroundColor: objectIdToOKLCH(ballot_candidate._id) }}><TableCell>{ballot_candidate._id}</TableCell><TableCell>{ballot_candidate.ballotID}</TableCell><TableCell>{ballot_candidate.person_ppsn}</TableCell></TableRow>
      ));
      return dataElement2;
}




let dataElement1 = <Table className='dataElement' key={ballot._id.toString()} style={{ backgroundColor: objectIdToOKLCH(ballot._id) }}>
<TableBody>
  <TableRow><TableCell><FormLabel>Closing date:</FormLabel><Tab></Tab>{formatDateTime(ballot.closing_datetime)}</TableCell></TableRow>
  <TableRow><TableCell><FormLabel>Title:</FormLabel><Tab></Tab> {ballot.title}</TableCell></TableRow>
</TableBody>
</Table>
;