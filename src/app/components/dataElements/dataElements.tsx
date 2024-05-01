import { FormLabel, Tab, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { formatDateTime, objectIdToOKLCH } from "../helpers";
import { ObjectId } from "mongodb";
import { Date } from "mongoose";


class BallotData {

  _id : ObjectId
  title : String
  closing_datetime : Date

  constructor(x : object){

    
  }

}


export function getBallotDataElement(ballot : object){
    let dataElement1 = <Table className='dataElement' key={ballot._id.toString()} style={{ backgroundColor: objectIdToOKLCH(ballot._id) }}>
      <TableBody>
        <TableRow><TableCell><FormLabel>Closing date:</FormLabel><Tab></Tab>{formatDateTime(ballot.closing_datetime)}</TableCell></TableRow>
        <TableRow><TableCell><FormLabel>Title:</FormLabel><Tab></Tab> {ballot.title}</TableCell></TableRow>
      </TableBody>
    </Table>
    ;
    return dataElement1;
}


export function get(){
    let dataElement2 = (candidates_for_ballot.map(ballot_candidate =>
        <TableRow key={ballot_candidate._id.toString()} style={{ backgroundColor: objectIdToOKLCH(ballot_candidate._id) }}><TableCell>{ballot_candidate._id}</TableCell><TableCell>{ballot_candidate.ballotID}</TableCell><TableCell>{ballot_candidate.person_ppsn}</TableCell></TableRow>
      ));
      return dataElement2;
}