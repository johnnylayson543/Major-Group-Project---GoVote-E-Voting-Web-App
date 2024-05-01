import { IBallot } from "../../database/models/Ballot";
import { ICandidate } from "../../database/models/Candidate";
import { IUser } from "../../database/models/User";
import { user_type } from "./user_type";

export class candidate_type {

    _id: String;
    person_ppsn:String;
    ballotID:String

    constructor(person_ppsn?:String, ballotID?:String, _id?:String){
        this._id = _id;
        this.person_ppsn = person_ppsn;
        this.ballotID = ballotID;
    }

}