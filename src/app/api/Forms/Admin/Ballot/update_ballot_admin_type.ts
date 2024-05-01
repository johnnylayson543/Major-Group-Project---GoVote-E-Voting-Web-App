
import { URLSearchParams } from "url";
import { ballot_details } from "./helpers/helpers";
import { ballot_type } from "../../Basic/ballot_type";

export class update_ballot_admin_type {

    ballot : ballot_type;

    constructor(x: URLSearchParams) {
        const ballot_id = x.get("ballotID");
        //const closing_time = x.get("ballot_closing_time");
        //this.ballot = {ballotID: ballot_id, closingDate: closing_time};

        // x is a URL object, so get find the parameter name
        const title = x.get('ballot_title');
        const closing_datetime = x.get('ballot_closing_datetime');
        const opening_datetime = x.get('ballot_opening_datetime');


        let ballot_datails1 = ballot_details.builder({ closing_datetime: closing_datetime })
            .setTitle(title)
            .setOpeningDateTime(opening_datetime)
            .build().describe();
        this.ballot = new ballot_type(ballot_id, title, new Date(closing_datetime));
        //console.log(title + ", " + closing_datetime + ", " + opening_datetime);
        //console.log(ballot_datails1);
    }
}
