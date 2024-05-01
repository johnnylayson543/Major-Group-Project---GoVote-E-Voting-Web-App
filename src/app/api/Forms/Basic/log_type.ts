export class log_type {

    _id: String
    voteID: String;

    constructor(voteID:string, _id?:String){
        this.voteID = voteID;
        this._id = _id;
    }

}