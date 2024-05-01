
import { useState, useEffect } from 'react'
import { Document } from 'mongoose';
import { Ballot } from '@/app/api/database/models/Ballot';

class ballotData {

    ballots :[Document<typeof Ballot>]

    constructor(){
        this.ballots = this.getBallots()
    }

    getBallots(){
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


}