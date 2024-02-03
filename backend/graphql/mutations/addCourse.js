const CourseInputType = require("../types/course/CourseInputType");
const CourseType = require("../types/course/CourseType");
const db = require("../../models");

const addCourse = {
  type: CourseType,
  args: {
    course: { type: CourseInputType },
  },
  resolve: async (_, args, context) => {
    const user = context.req.raw.user;
    const { course } = args;

    const newCourse = await db.Class.create(course);

    return newCourse;
  },
};

module.exports = addCourse;
