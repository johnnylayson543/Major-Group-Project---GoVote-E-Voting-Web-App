
export class retrieve_the_votes_for_the_voter_voter_type {
    voter = {}

    constructor(x) {
        const voter_id = x.get('voterID').replace(/[{}]/g, "");

        this.voter = { _id: voter_id };
    }

}