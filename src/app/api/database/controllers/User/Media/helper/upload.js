import formidable from "formidable";
import fs from 'fs';
import path from 'path';

export const config = {
    api: {
        bodyPaprser: false,
    },
}

export default async (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = "./uploads";
    form.keepExtensions = true;
    form.hash = 'sha1';

    form.parse(req, (err, fields, files) => {
        if (err) {
            res.status(500).json({ error: "There was an error parsing the files" });
        }

        const file = files.file;

        const userID = fields.userID;
        const newFilePath = path.join(process.cwd(), 'user-media', userID, file.name);

        fs.rename(file.filepath, newFilePath, (err) => {
            if (err) {
                res.status(500).json({ error: "Could not move the file. " });
                return;
            }
            
            console.log("file.toJSON(): ");
            console.log(file.toJSON());

            const fileData = {
                filename: files.file.name,
                type: files.file.type,
                size: files.file.size,
                path: files.file.filepath,
                hash: files.file.hash
            };
            // filename, hash, path

            res.status(200).json({data: "ok", result: fileData, form: form});
        });
    });

};