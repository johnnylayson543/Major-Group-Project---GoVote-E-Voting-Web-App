import nextConnect from 'next-connect';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()})-${file.originalname}`);
    },
});

const upload = multer({ storage });

const apiRoute = nextConnect({
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allow` });
    },
});

apiRoute.use(upload.single('file'));

apiRoute.post(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file upload' });
    }
    const hash = await hashFile(path.join('uploads', req.file.filename));
    res.status(200).json({ message: `File upload: ${req.file.filename}` });

    req.status(200).json({
        message: 'File uploaded successfully',
        filename: req.file.filename,
        location: path.join('uploads', req.file.filename),
        filesize: req.file.size,
        contentTypr: req.file.mimetype,
        hash,
    });
});

export default apiRoute;

export const config = {
    api: {
        bodyParse: false,
    },
};

async function hashFile(filepath) {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('sha256');
        const stream = fs.createReadStream(filepath);

        stream.on('data', (chunk) => hash.update(chunk));
        stream.on('end', () => resolve( hash.digest('hex') ));
        stream.on('error', reject);
    });
}