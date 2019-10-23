const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const APP_SECRET = process.env.APP_SECRET;
const PASS_SECRET = process.env.PASS_SECRET;

async function signInUser (parent, args, context) {
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error('No such user found');
  }
  
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};

async function createUser (parent, args, context) {
  const password = await bcrypt.hash(args.password, parseInt(PASS_SECRET, 10));
  const user = await context.prisma.createUser({ ...args, password});
  const token = jwt.sign({ userId: user.id}, APP_SECRET);

  return {
    token,
    user,
  };
};

module.exports = {
  signInUser,
  createUser,
};