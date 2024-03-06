
import { ballot_details  } from "./helpers/helpers";

export class update_ballot_admin_type {

    ballot = {};

    constructor(x){
        const ballot_id = x.get("ballotID");
        //const closing_time = x.get("ballot_closing_time");
        //this.ballot = {ballotID: ballot_id, closingDate: closing_time};

        // x is a URL object, so get find the parameter name
        const title = x.get('ballot_title');
        const closing_datetime = x.get('ballot_closing_datetime');
        const opening_datetime = x.get('ballot_opening_datetime');

                        
        let ballot_datails1 = ballot_details.builder({closing_datetime: closing_datetime})
            .setTitle(title)
            .setOpeningDateTime(opening_datetime)
            .build().describe();
        this.ballot = {ballotID: ballot_id, ...ballot_datails1};   
        console.log(title + ", " + closing_datetime + ", " + opening_datetime);
        console.log(ballot_datails1);
     }
}
