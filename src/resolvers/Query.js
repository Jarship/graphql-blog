const { getUserId, AUTHENTICATION_ERROR } = require("../utils");

function active () {
  return "The GraphQL API is active";
};

function feed (parent, args, context) {
  const posts = context.prisma.blogPosts();
  return { blogs: posts, count: posts.length};
};

function blog (parent, args, context) {
  return context.prisma.blogPost({id: args.id});
};

function unPublished (parent, args, context) {
  const filter = { isPublished_equals: false};
  return context.prisma.blogPost({ where: filter});
}

function getUser (parent, args, context) {
  const userId = getUserId(context);
  if (!userId) {
    return {
      error: AUTHENTICATION_ERROR,
    };
  }
  return {
    ...context.prisma.user({ id: userId }),
    error: null,
  };
};

module.exports = {
  active,
  feed,
  blog,
  unPublished,
  getUser,
};