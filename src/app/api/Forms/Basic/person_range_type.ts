import internal from "stream";

export class person_range_type {

    min : Number
    max : Number

    constructor(min:Number, max:Number){
        if(min < max){
            this.min = min;
            this.max = max;
        } else {
            throw new Error("Invalid range!");
            
        }
    }

}