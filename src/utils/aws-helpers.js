const aws = require('aws-sdk');
const { generateRandomToken } = require('./functions');
const { FAILED_UPLOAD_ERROR } = require('./errors');

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const S3_BUCKET = process.env.USER_PROFILE_BUCKET_NAME;
const PHOTOS_DIRECTORY = process.env.USER_PROFILE_PHOTOS_DIRECTORY;

const DATA_REGEX = /^data:/;
const BASE_REGEX = /^image\/\w+;base64,/;


async function putImageIntoBucket (base64String) {
  let error = false;
  const s3 = new aws.S3( { params: { Bucket: S3_BUCKET } });
  const key = `${PHOTOS_DIRECTORY}/${generateRandomToken()}`;
  base64String = base64String.replace(DATA_REGEX, "");
  const type = base64String.substring(0, base64String.indexOf(';'));
  const buf = new Buffer(base64String.replace(BASE_REGEX, ""), 'base64');
  const data = {
    Key: key,
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: type
  };
  s3.putObject(data, (err) => {
    if (err) {
      error = true;
    }
  });
  if (error) {
    return {
      location: null,
      error: FAILED_UPLOAD_ERROR
    };
  }
  const location = `https://${S3_BUCKET}.s3.amazonaws.com/${key}`;
  return { location, error: null };
};

module.exports = {
  putImageIntoBucket,
};