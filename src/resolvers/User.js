const fetch = require('isomorphic-unfetch');
const { generateRandomToken } = require('../utils');

async function invitations (parent, args, context) {
  if(!parent.id) return "";
  const invites = await context.prisma.user({ id: parent.id }).invitations();
  return invites.map(invite => invite.token);
};

async function photo (parent, args, context) {
  if(!parent.id) return "";
  const user = await context.prisma.user({ id: parent.id });
  if (!user.photo) {
    const photo = await fetch(`https://ui-avatars.com/api/?rounded=true&name=${user.name}`, {
      method: 'GET'
    });
    return photo.url;
  } else {
    return user.photo;
  }
};

function url (parent, args, context) {
  if (!parent.id) return "";
  return parent.profileUrl;
};

module.exports = {
  invitations,
  photo,
  url,
};