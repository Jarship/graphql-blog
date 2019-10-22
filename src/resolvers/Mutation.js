const bcrypt = require('bcryptjs');

async function login (parent, args, context) {
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error('No such user found');
  }
  return {
    token: "",
    user,
  };
};

module.exports = {
  login
};