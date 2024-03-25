import mongoose from "mongoose";
import { getModel } from "../helpers/helpers";
import { User } from "../User";

const mediaSchema = new mongoose.Schema ({
    userID: {type: String, required: true, unique: false, ref: 'User'},
    fileID: {type: String, required: true, unique: true},
    placement: {type: String, required: false, unique: true},
    access: {type: [String], required: false, unique: false}
    //id: {type: String, required: true, unique: true}
});

class MediaClass {

    static async add_media_item(x){
        try {
            const placement = "UID-" + x.user._id + "_FID-M-{" + x.meda.placement + "}";
            const obj = {userID: x.user._id, fileID: x.file._id, placement: placement };

            const media = await Media.create(obj);

            return media;
        } catch (error) {
            console.error('An error occurred while retrieving the candidate:', error);
            console.error('Error occurred:', error.message);
        }


    }
    

}

mediaSchema.loadClass(MediaClass);

export const Media = getModel('Media', mediaSchema);

// export default Admin;