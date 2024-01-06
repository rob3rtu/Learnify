const db = require("../../models");
const jwt = require("jsonwebtoken");
const { GraphQLString, GraphQLNonNull } = require("graphql");
const UserType = require("../types/user/UserType");

const verifyTokenQuery = {
  type: UserType,
  args: {
    token: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_, args, context) => {
    const { token } = args;

    const potentialUser = jwt.decode(token, process.env.JWT_KEY);

    if (potentialUser === null) {
      //here i want to return a status code of 404
    }

    const actualUser = await db.User.findByPk(potentialUser.id);

    return actualUser;
  },
};

module.exports = verifyTokenQuery;
