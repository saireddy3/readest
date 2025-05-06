import { r2Storage } from './r2';

export const getDownloadSignedUrl = async (
  fileKey: string,
  expiresIn: number,
) => {
  const bucketName = process.env['R2_BUCKET_NAME'] || '';
  return await r2Storage.getDownloadSignedUrl(bucketName, fileKey, expiresIn);
};

export const getUploadSignedUrl = async (
  fileKey: string,
  contentLength: number,
  expiresIn: number,
) => {
  const bucketName = process.env['R2_BUCKET_NAME'] || '';
  return await r2Storage.getUploadSignedUrl(bucketName, fileKey, contentLength, expiresIn);
};

export const deleteObject = async (fileKey: string) => {
  const bucketName = process.env['R2_BUCKET_NAME'] || '';
  return await r2Storage.deleteObject(bucketName, fileKey);
};
