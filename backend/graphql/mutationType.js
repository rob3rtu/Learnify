const { GraphQLObjectType, GraphQLString } = require("graphql");
const createUser = require("./mutations/user/createUser");

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: createUser,
  },
});

module.exports = mutationType;
