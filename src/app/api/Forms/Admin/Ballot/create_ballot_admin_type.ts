import { URLSearchParams } from "url";
import { ballot_type } from "../../Basic/ballot_type";

export class create_ballot_admin_type {

    ballot :ballot_type;

    constructor(x:URLSearchParams){
        const title = x.get('ballot_title');
        const closing_datetime = x.get('ballot_closing_datetime');
        /*const minAge = x.get('minAge')
        const votingArea = x.get('votingArea')
        const startDateTime = x.get('startDateTime')
        const endDateTime = x.get('endDateTime')*/

        this.ballot = new ballot_type(null, title, new Date(closing_datetime));
        console.log(this.ballot);
    }

}