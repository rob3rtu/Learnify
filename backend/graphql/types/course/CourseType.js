const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} = require("graphql");

const CourseType = new GraphQLObjectType({
  name: "Course",
  fields: {
    id: {
      type: GraphQLID,
    },
    shortName: {
      type: GraphQLString,
    },
    longName: {
      type: GraphQLString,
    },
    domain: {
      type: GraphQLString,
    },
    year: {
      type: GraphQLInt,
    },
    semester: {
      type: GraphQLInt,
    },
  },
});

module.exports = CourseType;
