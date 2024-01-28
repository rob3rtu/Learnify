const {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const CourseFiltersType = new GraphQLInputObjectType({
  name: "CourseFilters",
  fields: {
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

module.exports = CourseFiltersType;
