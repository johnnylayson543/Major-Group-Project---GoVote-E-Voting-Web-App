import { URLSearchParams } from "url";
import { user_type } from "../Basic/user_type";

export class retrieve_the_voter_voter_type {
    user : user_type;

    constructor(x: URLSearchParams) {
        const person_id = x.get('person_ppsn');

        this.user = new user_type(person_id);
    }

}