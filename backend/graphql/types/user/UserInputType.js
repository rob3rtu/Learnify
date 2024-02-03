const {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require("graphql");

const UserInputType = new GraphQLInputObjectType({
  name: "UserInputType",
  fields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    role: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});

module.exports = UserInputType;
