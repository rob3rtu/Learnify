const { GraphQLObjectType } = require("graphql");
const loginQuery = require("./queries/login");
const verifyTokenQuery = require("./queries/verifyToken");

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    login: loginQuery,
    verifyToken: verifyTokenQuery,
  },
});

module.exports = queryType;
