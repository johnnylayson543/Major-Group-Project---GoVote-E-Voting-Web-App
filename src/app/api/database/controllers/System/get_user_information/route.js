// pages/api/user_info.js
import { cookies } from "next/headers";

export async function GET(req, res) {

    const isToken = cookies().get("user_token") != undefined;
    console.log(isToken);
    if (!isToken) {
        // Not signed in
        res = Response.json({data: "Not signed in", result: null});
        return res;
    } else {
        try {
            console.log("user fetch: ");    //                     \api\database\controllers\User\is_signed_into_account\
            const userResponse = await fetch('http://localhost:3000/api/database/controllers/User/is_signed_into_account');
            const userData = await userResponse.json();
            console.log("user: ");
            console.log(user);
            user = userData.result;
            const roles = user.roles;
            const person_ppsn = user.ppsn;

            const data = {};

            if (roles.includes('voter')) {
                console.log("voter fetch: ");
                const voterResponse = await fetch(`http://localhost:3000/api/database/controllers/Voter/retrieve_the_voter?person_ppsn=${person_ppsn}`);
                data.voter = await voterResponse.json();
                
                console.log("vote fetch: ");
                const voteResponse = await fetch(`http://localhost:3000/api/database/controllers/Voter/Vote/retrieve_the_votes_for_the_voter?voterID=${voter_id}`);
                data.vote = await voteResponse.json();
            }

            if (roles.includes('admin')) {
                console.log("admin fetch: ");
                const adminResponse = await fetch(`http://localhost:3000/api/database/controllers/Admin/retrieve_the_admin?person_ppsn=${person_ppsn}`);
                data.admin = await adminResponse.json();
            }

            if (roles.includes('teller')) {
                console.log("teller fetch: ");
                const tellerResponse = await fetch(`http://localhost:3000/api/database/controllers/Teller/retrieve_the_teller?person_ppsn=${person_ppsn}`);
                data.teller = await tellerResponse.json();
            }

            if (roles.includes('candidate')) {
                console.log("candidate fetch: ");
                const tellerResponse = await fetch(`http://localhost:3000/api/database/controllers/Teller/User/Candidate/retrieve_the_candidate_with_this_ppsn?ppsn=${person_ppsn}`);
                data.candidate = await tellerResponse.json();
            }

            if (roles.includes('user')) {
                console.log("user's person details fetch: ");
                const tellerResponse = await fetch(`http://localhost:3000/api/database/controllers/Teller/retrieve_the_persons_details?person_ppsn=${person_ppsn}`);
                data.person = await tellerResponse.json();
            }

            console.log(data);
            return Response.json({ data: "okay", result: data });
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }
}