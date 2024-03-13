'use client';

import { useEffect } from "react";


export default function UserAuthentication({ window }){

    const [user, setUser] = useState(null);

    useEffect(() => {

        fetch(`http://localhost:3000/api/database/controllers/User/is_signed_into_account`).then((res) => res.json())
        .then((data) => {
            setUser(data.result);
            console.log("User data")
            console.log(data.result);
        })



    })

}

// PropTypes for the NavBar
UserAuthentication.propTypes = {
    window: PropTypes.object,
};