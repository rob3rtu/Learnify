const { GraphQLList } = require("graphql");
const UserType = require("../types/user/UserType");
const db = require("../../models");
const TeacherType = require("../types/teacher/TeacherType");

const teachers = {
  type: GraphQLList(TeacherType),
  resolve: async (_, args, context) => {
    const teachersList = await db.Teacher.findAll({
      attributes: ["id", "userId"],
    });

    return teachersList;
  },
};

module.exports = teachers;
