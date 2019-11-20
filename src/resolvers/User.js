async function invitations(parent, args, context) {
  if (!parent.id) return '';
  const invites = await context.prisma.user({ id: parent.id }).invitations();
  return invites.map((invite) => invite.token);
}

async function photo(parent, args, context) {
  if (!parent.id) return '';
  const user = await context.prisma.user({ id: parent.id });
  if (!user.photo) {
    const photoUrl = `https://ui-avatars.com/api/?rounded=true&name=${user.name}`;
    return photoUrl;
  }
  return user.photo;
}

function url(parent) {
  if (!parent.id) return '';
  return parent.profileUrl;
}

module.exports = {
  invitations,
  photo,
  url,
};
