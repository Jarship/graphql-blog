async function invitations (parent, args, context) {
  const invites = await context.prisma.user({ id: parent.id }).invitations();
  return invites.map(invite => invite.token);
};

module.exports = {
  invitations,
};