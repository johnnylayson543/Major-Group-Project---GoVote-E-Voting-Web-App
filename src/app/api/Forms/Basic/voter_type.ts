
export class voter_type {
    
    _id : String;
    person_ppsn: String;
    electionID: String;

    constructor(_id?:String, person_ppsn?:String, electionID?:String){
        this._id = _id;
        this.person_ppsn = person_ppsn;
        this.electionID = electionID;
    }

}