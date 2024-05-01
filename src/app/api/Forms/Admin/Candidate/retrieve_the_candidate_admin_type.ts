import { URLSearchParams } from "url";
import { candidate_type } from "../../Basic/candidate_type";


export class retrieve_the_candidate_admin_type {

    candidate :candidate_type;

    constructor(x : URLSearchParams){
        const candidate = {_id: x.get('candidateID').replace(/[{}]/g, "")};
        console.log("candidate: "); console.log(candidate);

        this.candidate = new candidate_type(null, null, candidate._id);
    }

}