const aws = require('aws-sdk');
const { generateRandomToken } = require('./functions');

aws.config.update({
  region: 'us-east-1e',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  signatureVersion: 'v4'
});

const S3_BUCKET = process.env.USER_PROFILE_BUCKET_NAME;
const PHOTOS_DIRECTORY = process.env.USER_PROFILE_PHOTOS_DIRECTORY;

async function getPresignedUploadUrl() {
  const s3 = new aws.S3();
  const key = `${PHOTOS_DIRECTORY}/${generateRandomToken()}`;
  const url = await s3
    .getSignedUrl('putObject', {
      Bucket: S3_BUCKET,
      Key: key,
      ContentType: 'image/*',
      Expires: 500,
    });
  const location = `https://${S3_BUCKET}.s3.amazonaws.com/${key}`;
  return { location, url };
};

module.exports = {
  getPresignedUploadUrl,
};