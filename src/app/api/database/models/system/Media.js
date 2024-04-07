import mongoose from "mongoose";
import { getModel } from "../helpers/helpers";
import { User } from "../User";


const placementSchema = new mongoose.Schema ({
    route: {type: String, required: true, unique: true},
    purpose: {type: String, required: true, unique: true}
});

const accessSchema = new mongoose.Schema ({
    userID: {type: String, required: true, unique: true},
    owner: {type: Boolean, required: true, unique: false}
});

const mediaSchema = new mongoose.Schema ({
    userID: {type: String, required: true, unique: false, ref: 'User'},
    fileID: {type: String, required: true, unique: true},
    placement: {type: [placementSchema], required: false, unique: true},
    access: {type: [accessSchema], required: true, unique: false}
    //id: {type: String, required: true, unique: true}
});

class MediaClass {

    static async add_media_item(x){
        try {

            const obj_storage = {storage: x.storage};
            const storage = await Storage.add_storage()

            const obj_file = {file: x.file, storageID: storage._id};
            const file = await File.add_file(obj_file);

            if(file){
                const obj = {userID: x.user._id, fileID: file._id, access: [ {userID: x.user.user._id, owner: true } ] };
                
                const media = await Media.create(obj);

                return media;
            } else {
                return null;
            }
        } catch (error) {
            console.error('An error occurred while retrieving the candidate:', error);
            console.error('Error occurred:', error.message);
        }


    }
    

}

mediaSchema.loadClass(MediaClass);

export const Media = getModel('Media', mediaSchema);

// export default Admin;