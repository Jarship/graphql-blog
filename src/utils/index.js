const {
  AUTHENTICATION_ERROR,
  INVITATION_LIMIT_ERROR,
  NO_VALID_USER_ERROR,
  NO_USER_MATCHES_URL_ERROR,
  INVALID_PASSWORD_ERROR,
  INVALID_INVITATION_ERROR,
  FAILED_UPLOAD_ERROR
} = require('./errors');

const { getUserId, generateRandomToken } = require('./functions');

const {  uploadToS3 } = require('./aws-helpers');

module.exports = {
  getUserId,
  generateRandomToken,
  uploadToS3,
  AUTHENTICATION_ERROR,
  INVITATION_LIMIT_ERROR,
  NO_VALID_USER_ERROR,
  NO_USER_MATCHES_URL_ERROR,
  INVALID_PASSWORD_ERROR,
  INVALID_INVITATION_ERROR,
  FAILED_UPLOAD_ERROR
};