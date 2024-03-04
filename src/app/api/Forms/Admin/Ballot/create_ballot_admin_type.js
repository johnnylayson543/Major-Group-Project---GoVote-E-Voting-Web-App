
export class create_ballot_admin_type {

    ballot = {};

    constructor(x){
        const title = x.get('ballot_title');
        const closing_date = x.get('ballot_closing_date');
        /*const minAge = x.get('minAge')
        const votingArea = x.get('votingArea')
        const startDateTime = x.get('startDateTime')
        const endDateTime = x.get('endDateTime')*/

        this.ballot = {title: title, closing_date: closing_date};
        console.log(this.ballot);
    }

}