
import { useState, useEffect } from 'react'

class jBallot {

    constructor(){

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