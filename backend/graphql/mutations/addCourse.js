const { GraphQLString } = require("graphql");
const CourseInputType = require("../types/course/CourseInputType");
const db = require("../../models");

const addCourse = {
  type: GraphQLString,
  args: {
    course: { type: CourseInputType },
  },
  resolve: async (_, args, context) => {
    const user = context.req.raw.user;
    const { course } = args;

    console.log(args);

    await db.Class.create(course);

    return "ok";
  },
};

module.exports = addCourse;
