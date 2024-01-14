const { GraphQLObjectType } = require("graphql");
const verifyToken = require("./queries/verifyToken");

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    verifyToken: verifyToken,
  },
});

module.exports = queryType;
