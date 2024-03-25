import mongoose from "mongoose";
import { getModel } from "../helpers/helpers";
import { User } from "../User";

const storageSchema = new mongoose.Schema ({
    name: {type: String, required: true, unique: true},
    path: {type: [String], required: true, unique: false}
    //id: {type: String, required: true, unique: true}
});

class MediaClass {

    static async add_storage(x){
        try {
            const obj = {name: x.storage.name, path: x.storage.path };
            const storage = await Storage.create(obj);
            return storage;
        } catch (error) {
            console.error('An error occurred while adding the storage and its locations:', error);
            console.error('Error occurred:', error.message);
        }

    }
    

}

storageSchema.loadClass(storageClass);

export const Storage = getModel('Storage', storageSchema);

// export default Admin;