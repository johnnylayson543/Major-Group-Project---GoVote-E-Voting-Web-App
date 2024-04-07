
export class add_media_to_my_storage_user_type {
    
    user = {};
    file = {};
    storage = {};

    // need userID, (storageName or storageID)
    // storage path is ./uploads + file path 
    // process.cwd(), 'user-media', userID, file.name
    constructor(x, y){
        const user_id = x.get('userID');
        this.user = {_id: user_id};

        const file = y;
        const file_name = file.name;
        const file_type = file.type;
        const file_size = file.size;
        const file_path = file.filepath;
        const file_hash = file.hash;

        const storageID = x.get('storageID');
        this.file = (storageID) ? 
            {storageID: storageID, filename: file_name, hash: file_hash}:
            {filename: file_name, hash: file_hash};

        const storageName = x.get('storageName');
        this.storage = (storageID) ? 
            {_id: storageID, name: storageName  , path: file_path }:
            {name: storageName  , path: file_path };


        console.log("this.user: ");
        console.log(this.user);

        console.log("this.file: ");
        console.log(this.file);

        console.log("this.storage: ");
        console.log(this.storage);
    }
}