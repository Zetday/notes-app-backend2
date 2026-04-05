import ClientError from '../../../exceptions/client-error.js';
import response from '../../../utils/response.js';
import storageService from '../storage/storage-service.js';

export const uploadImages = async (req, res, next) => {
  if (!req.file) {
    return next(new ClientError('No file uploaded'));
  }
  // Simpan file menggunakan local storage
  //   const host = process.env.HOST || 'localhost';
  //   const port = process.env.PORT || 3000;
  //   const encodedFilename = encodeURIComponent(req.file.filename);
  //   const fileLocation = `http://${host}:${port}/uploads/${encodedFilename}`;

  // Simpan file menggunakan AWS S3
  const filename = `${Date.now()}-${req.file.originalname}`;
  const fileLocation = await storageService.writeFile(req.file, {
    filename,
    contentType: req.file.mimetype,
  });

  return response(res, 201, 'success', { fileLocation });
};
