// pages/api/user_info.js
import { cookies } from "next/headers";

function getCookiesHeader(cookiesObject) {
    return cookiesObject.map( cooke_entry => `${encodeURIComponent(cooke_entry.name)}=${encodeURIComponent(cooke_entry.value)}`)
      .join('; ');
  }
  

export async function GET(req, res) {


        // Let's say this is your object with cookies
    const cookiesObject = cookies().getAll();

    const cookieHeaderString = getCookiesHeader(cookiesObject.flat());
    console.log("cookies().getAll() in get user information: ");
    console.log(cookies().getAll());

    console.log("req  in get user information: ");
    console.log(req);
    console.log("req.headers.cookie");
    console.log(req.headers.cookie);
    const isToken = cookies().get("user_token") != undefined;
    console.log("isToken: ");
    console.log(isToken);
    const cookies1 = req.headers.cookie;
    if (!isToken) {
        // Not signed in
        res = Response.json({ data: "Not signed in", result: null });
        return res;
    } else {
        try {
            console.log("Entered try block in get user information route.js: ");
            console.log("user fetch: ");    //                     \api\database\controllers\User\is_signed_into_account\
            const userResponse = await fetch('http://localhost:3000/api/database/controllers/User/is_signed_into_account', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': cookieHeaderString || "" // Forward the cookies from the incoming request
                },
                credentials: 'include'
            });
            const userData = await userResponse.json();
            const user = userData.result;
            console.log("user: ");
            console.log(user);
            const roles = user.roles;
            console.log("user.roles: ");
            console.log(user.roles);
            const person_ppsn = user.ppsn;

            const data = {};
            data.user = user;

            if (roles.includes('voter')) {
                console.log("voter fetch: ");
                const voterResponse = await fetch(`http://localhost:3000/api/database/controllers/Voter/retrieve_the_voter?person_ppsn=${person_ppsn}`);
                data.voter = (await voterResponse.json()).result;
                const voter_id =data.voter._id;
                console.log("vote fetch: ");
                const voteResponse = await fetch(`http://localhost:3000/api/database/controllers/Voter/Vote/retrieve_the_votes_for_the_voter?voterID=${voter_id}`);
                data.vote = (await voteResponse.json()).result;
            }

            if (roles.includes('admin')) {
                console.log("admin fetch: ");
                const adminResponse = await fetch(`http://localhost:3000/api/database/controllers/Admin/retrieve_the_admin?person_ppsn=${person_ppsn}`);
                data.admin = (await adminResponse.json()).result;
            }

            if (roles.includes('teller')) {
                console.log("teller fetch: ");
                const tellerResponse = await fetch(`http://localhost:3000/api/database/controllers/Teller/retrieve_the_teller?person_ppsn=${person_ppsn}`);
                data.teller = (await tellerResponse.json()).result;
            }

            if (roles.includes('candidate')) {
                console.log("candidate fetch: ");
                const candidateResponse = await fetch(`http://localhost:3000/api/database/controllers/User/Candidate/retrieve_the_candidate_with_this_ppsn?ppsn=${person_ppsn}`);
                data.candidate = (await candidateResponse.json()).result;
            }

            if (roles.includes('user')) {
                console.log("user's person details fetch: ");
                const personResponse = await fetch(`http://localhost:3000/api/database/controllers/User/Person/retrieve_the_persons_details?ppsn=${person_ppsn}`);
                data.person = (await personResponse.json()).result;
            }

            console.log(data);
            return Response.json({ data: "okay", result: data });
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }
}