require('dotenv').config();
const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');

const resolvers = {
  Query,
  Mutation,
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
  cors: {
    origin: "http://localhost"
  }
};
server.start(options, ({ port }) => console.log(`Server is running on http://localhost:${port}`));

