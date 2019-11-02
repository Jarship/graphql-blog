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

module.exports = {
  AUTHENTICATION_ERROR,
  INVITATION_LIMIT_ERROR,
  NO_VALID_USER_ERROR,
  INVALID_PASSWORD_ERROR,
  INVALID_INVITATION_ERROR
};