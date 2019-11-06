require('dotenv').config();
const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');

const resolvers = {
  Query,
  Mutation,
  User,
};

const server = new GraphQLServer({
  typeDefs: process.env.PATHWAY,
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    };
  },
});

const options = {
  port: process.env.PORT,
  endpoint: process.env.ENDPOINT,
  subscriptions: process.env.SUBSCRIPTION,
  playground: process.env.PLAYGROUND,
  bodyParserOptions: {
    limit: '5000000kb'
  },
  cors: {
    "origin": ["http://localhost", "https://satsui.com", "https://www.satsui.com"],
    "allowedHeaders": ["Authorization", "Content-Type"]
  }
};
server.start(options, ({ port }) => console.log(`Server is running on http://localhost:${port}`));

