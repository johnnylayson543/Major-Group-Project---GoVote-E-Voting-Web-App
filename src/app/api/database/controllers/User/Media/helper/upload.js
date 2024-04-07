import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

export default async (req, res) => {
    console.log("req: ");
    console.log(req);
  if (req.method.toLowerCase() === 'post') {
    upload.single('file')(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // Handle Multer errors
        console.error(err);
        res.status(400).json({ error: err.message });
        return;
      } else if (err) {
        // Handle other errors
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      const file = req.file;
      const userID = req.body.userID;
      const newFilePath = path.join(process.cwd(), 'user-media', userID, file.name);

      try {
        await fs.promises.rename(file.path, newFilePath);

        const fileHash = await calculateFileHash(newFilePath);


        console.log("file data: ");
        console.log(file);

        const fileData = {
          filename: file.name,
          type: file.type,
          size: file.size,
          path: file.path,
          hash: fileHash
        };

        res.status(200).json({ data: "ok", result: fileData });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not move the file." });
      }
    });
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};