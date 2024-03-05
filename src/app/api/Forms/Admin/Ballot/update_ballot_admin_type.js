
export class update_ballot_admin_type {

    ballot = {};

    constructor(x){
        const ballot_id = x.get("ballotID");
        const closing_time = x.get("ballot_closing_time");
        this.ballot = {ballotID: ballot_id, closingDate: closing_time};

         // x is a URL object, so get find the parameter name
         const title = x.get('ballot_title');;
         const closing_datetime = x.get('ballot_closing_datetime');
         const opening_datetime = x.get('ballot_opening_datetime');
 
 
         let ballot_datails = person_datails.builder
             .setTitle(title)
             .setClosingDateTime(closing_datetime)
             .setOpeningDateTime(opening_datetime)
             .build().descibe();
         this.ballot = {ballotID: ballot_id, ...ballot_datails};   
         console.log(email + ", " + date_of_birth + ", " + ppsn + ", " + pass);
     }
}
