const { GraphQLObjectType, GraphQLString } = require("graphql");

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    dummyMutation: {
      type: GraphQLString,
      resolve: () => {
        return "hello mutation";
      },
    },
  },
});

module.exports = mutationType;
