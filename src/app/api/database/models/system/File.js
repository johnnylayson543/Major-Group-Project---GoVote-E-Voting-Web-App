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

class FileClass {

    static async add_file(x){
        try {
            const filter_storage = x.storage._id;
            const storage = await Storage.findOne(filter_storage);
            
            if(storage){
                const obj = {storageID: storage._id, filename: x.file.filename, hash: x.file.hash };
                const file = await File.create(obj);
                return file;
            } else {
                return null;
            }
        } catch (error) {
            console.error('An error occurred while registering the file:', error);
            console.error('Error occurred:', error.message);
        }

    }
    

}

fileSchema.loadClass(FileClass);

export const File = getModel('File', fileSchema);

// export default Admin;