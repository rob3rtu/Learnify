const { GraphQLList } = require("graphql");
const db = require("../../models");
const CourseType = require("../types/course/CourseType");

const courses = {
  type: GraphQLList(CourseType),
  resolve: async (_, args, context) => {
    const coursesList = await db.Class.findAll();

    return coursesList;
  },
};

module.exports = courses;
