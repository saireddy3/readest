import { AwsClient } from 'aws4fetch';

/**
 * Utility object for R2 storage operations
 * @type {Object}
 */
export const r2Storage = {
  /**
   * Get an AWS client instance for R2
   * @returns {AwsClient}
   */
  getR2Client: () => {
    return new AwsClient({
      service: 's3',
      region: process.env['R2_REGION'] || 'auto',
      accessKeyId: process.env['R2_ACCESS_KEY_ID'],
      secretAccessKey: process.env['R2_SECRET_ACCESS_KEY'],
    });
  },

  /**
   * Get the base R2 URL
   * @returns {string}
   */
  getR2Url: () => {
    const R2_ACCOUNT_ID = process.env['R2_ACCOUNT_ID'];
    return `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
  },

  /**
   * Get a signed URL for downloading a file
   * @param {string} bucketName - The name of the bucket
   * @param {string} fileKey - The key of the file
   * @param {number} expiresIn - The expiration time in seconds
   * @returns {Promise<string>} The signed URL
   */
  getDownloadSignedUrl: async (bucketName, fileKey, expiresIn) => {
    return (
      await r2Storage.getR2Client().sign(
        new Request(`${r2Storage.getR2Url()}/${bucketName}/${fileKey}?X-Amz-Expires=${expiresIn}`),
        {
          aws: { signQuery: true },
        },
      )
    ).url.toString();
  },

  /**
   * Get a signed URL for uploading a file
   * @param {string} bucketName - The name of the bucket
   * @param {string} fileKey - The key of the file
   * @param {number} contentLength - The length of the content in bytes
   * @param {number} expiresIn - The expiration time in seconds
   * @returns {Promise<string>} The signed URL
   */
  getUploadSignedUrl: async (bucketName, fileKey, contentLength, expiresIn) => {
    return (
      await r2Storage.getR2Client().sign(
        new Request(
          `${r2Storage.getR2Url()}/${bucketName}/${fileKey}?X-Amz-Expires=${expiresIn}&X-Amz-SignedHeaders=content-length`,
          {
            method: 'PUT',
            headers: {
              'Content-Length': contentLength.toString(),
            },
          },
        ),
        {
          aws: { signQuery: true },
        },
      )
    ).url.toString();
  },

  /**
   * Delete an object from storage
   * @param {string} bucketName - The name of the bucket
   * @param {string} fileKey - The key of the file
   * @returns {Promise<Response>} The deletion response
   */
  deleteObject: async (bucketName, fileKey) => {
    return await r2Storage.getR2Client().fetch(`${r2Storage.getR2Url()}/${bucketName}/${fileKey}`, {
      method: 'DELETE',
    });
  },
}; 