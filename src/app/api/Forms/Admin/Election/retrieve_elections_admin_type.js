

export class retrieve_elections_admin_type {

    election_filter = {};

    constructor(x){
        const filter = (x.get('election_filter')) ? x.get('election_filter') : {};

        this.election_filter = filter;
    }

}