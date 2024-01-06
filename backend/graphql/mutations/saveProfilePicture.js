const db = require("../../models");
const { GraphQLString } = require("graphql");

const saveProfilePicture = {
  type: GraphQLString,
  args: {
    url: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const user = context.req.raw.user;
    const { url } = args;

    const userToModify = await db.User.findByPk(user.id);
    userToModify.profileImage = url;
    await userToModify.save();

    return "ok";
  },
};

module.exports = saveProfilePicture;
