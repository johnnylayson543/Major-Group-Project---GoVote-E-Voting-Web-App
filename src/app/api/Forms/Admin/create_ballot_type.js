
class create_ballot_type {

    ballot = {};

    constructor(x){
        const title = x.get('ballot_title');
        const closing_time = x.get('ballot_closing_time');
        this.ballot = {title: title, closing_time: closing_time};
    }

}