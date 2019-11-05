const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const APP_SECRET = process.env.APP_SECRET;
const PASS_SECRET = process.env.PASS_SECRET;
const { 
  getUserId,
  generateRandomToken,
  AUTHENTICATION_ERROR,
  INVITATION_LIMIT_ERROR,
  NO_VALID_USER_ERROR,
  INVALID_PASSWORD_ERROR,
  INVALID_INVITATION_ERROR
} = require('../utils');


async function createInvite (parent, args, context) {
  const userId = getUserId(context);
  if (!userId) {
    return {
      invite: null,
      error : AUTHENTICATION_ERROR
    };
  }
  const invites = await context.prisma.user({ id: userId }).invitations();
  if (invites.length >= 5) {
    return {
      invite: null,
      error: INVITATION_LIMIT_ERROR
    };
  }
  const token = generateRandomToken();
  const invite = await context.prisma.createInvite({ token });
  await context.prisma.updateUser(
    {
      where: { id: userId },
      data: {
        invitations : {
          connect: { id: invite.id }
        }
      }
    }
  );
  
  return {
    invite: token,
    error: null,
  };
};

async function expireInvite (parent, args, context) {
  const userId = getUserId(context);
  if (!userId) {
    return {
      invite: null,
      error: AUTHENTICATION_ERROR

    }
  }
  const date = new Date();
  const invite = await context.prisma.updateInvite(
    {
      where : { token : args.invite },
      data: {
        expiresAt: date.toISOString()
      }
    }
  );
  await context.prisma.updateUser(
    {
      where: { id: userId },
      data: { invitations : {
        disconnect: { id: invite.id }
      }}
    }
  );
  return {
    invite: "Token expired",
    error: null
  };
};

async function signInUser (parent, args, context) {
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    return {
      token: null,
      user: null,
      error: NO_VALID_USER_ERROR
    };
  }
  
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    return {
      token: null,
      user: null,
      error: INVALID_PASSWORD_ERROR
    };
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
    error: null,
  };
};

async function createUser (parent, args, context) {
  const password = await bcrypt.hash(args.password, parseInt(PASS_SECRET, 10));
  const user = await context.prisma.createUser({ ...args, password});
  const token = jwt.sign({ userId: user.id}, APP_SECRET);
  
  return {
    token,
    user,
    error: null,
  };
};

async function markVisitor (parent, args, context) {
  const visitor = await context.prisma.createVisitor({ ipAddress: args.ipAddress });
  return !!visitor;
};

async function logError (parent, args, context) {
  const error = await context.prisma.createError({ ...args });
  return !!error;
}

module.exports = {
  signInUser,
  createUser,
  createInvite,
  expireInvite,
  markVisitor,
  logError,
};