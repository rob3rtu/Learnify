const { GraphQLObjectType, GraphQLString } = require("graphql");
const loginQuery = require("./queries/login");

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    login: loginQuery,
  },
});

module.exports = queryType;
