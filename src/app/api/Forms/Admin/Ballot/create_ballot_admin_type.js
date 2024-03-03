
export class create_ballot_admin_type {

    ballot = {};

    constructor(x){
        const title = x.get('ballot_title');
        const closing_time = x.get('ballot_closing_time');
        /*const minAge = x.get('minAge')
        const votingArea = x.get('votingArea')
        const startDateTime = x.get('startDateTime')
        const endDateTime = x.get('endDateTime')*/

        this.ballot = {title: title, closing_time: closing_time};
    }

}