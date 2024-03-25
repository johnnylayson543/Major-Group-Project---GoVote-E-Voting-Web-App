
export class add_new_media_user_type {
    user = {};
    file = {};
    media = {};

    constructor(x){
        const user_id = x.get('userID');
        this.user = {_id: user_id};

        const filename = x.get('filename');
        const storageID = x.get('storageID');
        const file_hash = x.get('fileHash');
        this.file = {filename: filename, storageID: storageID, hash: file_hash };

        const placement = x.get('mediaPlacement');
        this.media = {placement: placement};

    }
}