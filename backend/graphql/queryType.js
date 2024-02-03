const { GraphQLObjectType } = require("graphql");
const verifyToken = require("./queries/verifyToken");
const courses = require("./queries/courses");
const teachers = require("./queries/teachers");

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    verifyToken: verifyToken,
    courses: courses,
    teachers: teachers,
  },
});

module.exports = queryType;
