const AUTHENTICATION_ERROR = {
  name: 'Authentication Error',
  message: 'User is not authenticated'
};

const INVITATION_LIMIT_ERROR = {
  name: 'Invitation Limit',
  message: 'User has reached their invitation limit'
};

const NO_VALID_USER_ERROR = {
  name: 'No Valid User',
  message: "No valid user was found with that email"
};

const INVALID_PASSWORD_ERROR = {
  name: 'Invalid Password',
  message: 'Password was incorrect for the user'
};

const INVALID_INVITATION_ERROR = {
  name: 'Invalid Invitation',
  message: 'Invitation is not valid'
};

const FAILED_UPLOAD_ERROR = {
  name: 'Failed Upload',
  message: 'Profile image failed to upload'
};

const IMPROPER_FILE_FORMAT = {
  name: 'Improper File Format',
  message: 'Image files must be of a common format'
};

module.exports = {
  AUTHENTICATION_ERROR,
  INVITATION_LIMIT_ERROR,
  NO_VALID_USER_ERROR,
  INVALID_PASSWORD_ERROR,
  INVALID_INVITATION_ERROR,
  FAILED_UPLOAD_ERROR
};