const { GraphQLObjectType } = require("graphql");
const login = require("./queries/login");
const verifyToken = require("./queries/verifyToken");

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    login: login,
    verifyToken: verifyToken,
  },
});

module.exports = queryType;
