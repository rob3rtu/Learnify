const { GraphQLObjectType, GraphQLString } = require("graphql");

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    dummyQuery: {
      type: GraphQLString,
      resolve: () => {
        return "hello query";
      },
    },
  },
});

module.exports = queryType;
