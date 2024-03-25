import mongoose from "mongoose";
import { getModel } from "../helpers/helpers";
import { Storage } from "./Storage";
import { User } from "../User";

const fileSchema = new mongoose.Schema ({
    storageID: {type: String, required: true, unique: false},
    filename: {type: String, required: true, unique: true}, 
    hash: {type: String, required: true, unique: true},
    //id: {type: String, required: true, unique: true}
});

class MediaClass {

    static async add_file(x){
        try {
            const filter_storage = x.storage._id;
            const storage = await Storage.findOne(filter_storage);
            const storages = await Storage.find({});

            
            if(storage == {}){
                const storage0 = 0; 
                const obj_storage = {name: "store_" + storage0, path: ["@App/Media/store_" + storage0 + "/"]};
                storage = await Storage.add_storage()
            }
            const storage_id = (storage == {} ) ? obj_storage._id : storage._id;
            const obj = {name: storage_id, filename: x.file.filename, hash: x.file.hash };
            const file = await File.create(obj);
            return file;
        } catch (error) {
            console.error('An error occurred while registering the file:', error);
            console.error('Error occurred:', error.message);
        }

    }
    

}

fileSchema.loadClass(FileClass);

export const File = getModel('File', fileSchema);

// export default Admin;