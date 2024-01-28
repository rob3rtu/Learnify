const { GraphQLObjectType } = require("graphql");
const verifyToken = require("./queries/verifyToken");
const courses = require("./queries/courses");

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    verifyToken: verifyToken,
    courses: courses,
  },
});

module.exports = queryType;
