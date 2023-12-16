const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: {
      type: GraphQLID,
    },
    fullName: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    role: {
      type: GraphQLString,
    },
  },
});

module.exports = UserType;
