import mongoose from "mongoose";
import { getModel } from "../helpers/helpers";
import { User } from "../User";
import { Media } from "./Media";

const systemSchema = new mongoose.Schema ({
    name: {type: String, required: true, unique: true},
});

class SystemClass {

    static async add_new_media_for_the_user(x){
        try {
            const obj = x;
            const media = await Media.add_media(obj);
            return media;
        } catch (error) {
            console.error('An error occurred adding the media for the user:', error);
            console.error('Error occurred:', error.message);
        }

    }
    

}

systemSchema.loadClass(SystemClass);

export const System = getModel('System', systemSchema);

// export default Admin;