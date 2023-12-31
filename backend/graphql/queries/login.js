const db = require("../../models");
const { GraphQLString, GraphQLNonNull } = require("graphql");

const loginQuery = {
  type: GraphQLString,
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: (_, args, context) => {
    const { email } = args;
    //if user exists, generate token with the id of the user
    //if not, create a new user first, then generate token with the new id

    return "Merge!!!";
  },
};

module.exports = loginQuery;
