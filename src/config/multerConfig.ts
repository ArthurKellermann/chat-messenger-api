import { Request, Express } from 'express';
import multer, { FileFilterCallback, MulterError } from 'multer';
import { extname, resolve } from 'path';

const storage = multer.diskStorage({
  destination(req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
  },
  filename(req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
    cb(null, `${Date.now()}${extname(file.originalname)}`);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(new MulterError('Invalid file type'), false);
  }
};

export default {
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
};
