export class vote_type {

    voterID: String
    candidateID: String
    _id: String

    constructor(voterID?:String, candidateID?:String, _id?:String){
        this.voterID = voterID;
        this.candidateID = candidateID;
        this._id = _id;
    }

}