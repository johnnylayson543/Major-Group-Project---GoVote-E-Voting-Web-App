
export class set_the_other_user_roles_user_type {
    user = {};

    constructor(x){
        const token = x.get('userToken');
        console.log("token: " + decodeURIComponent(token));
        x.user = {token: token};
        console.log("x.user.token: ");
        console.log(x.user.token)
        


        console.log("user: " + x.user);
    }
}