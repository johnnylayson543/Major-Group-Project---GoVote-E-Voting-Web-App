

export class ballot_type {

    _id :String
    title :String
    closing_datetime :Date

    constructor(_id ?: String, title ?: String, closing_datetime ?:Date){
        this._id = _id;
        this.title = title;
        this.closing_datetime = closing_datetime;
    }
}