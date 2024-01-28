const {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const CourseInputType = new GraphQLInputObjectType({
  name: "CourseInputType",
  fields: {
    shortName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    longName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    domain: {
      type: new GraphQLNonNull(GraphQLString),
    },
    year: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    semester: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
});

module.exports = CourseInputType;
