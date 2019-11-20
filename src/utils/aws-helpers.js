const { S3 } = require('aws-sdk');
const { generateRandomToken } = require('./functions');

const S3_BUCKET = process.env.USER_PROFILE_BUCKET_NAME;
const PHOTOS_DIRECTORY = process.env.USER_PROFILE_PHOTOS_DIRECTORY;

const client = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  params: { Bucket: S3_BUCKET },
});

const uploadToS3 = async (file) => {
  const { createReadStream, filename } = file;

  const stream = createReadStream();
  const token = generateRandomToken();
  const Key = `${PHOTOS_DIRECTORY}/${token}--${filename}`;

  const response = await client
    .upload({
      Key,
      ACL: 'public-read',
      Body: stream,
    })
    .promise();

  return response.Location;
};

module.exports = {
  uploadToS3,
};
