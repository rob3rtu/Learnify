const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");
const db = require("../../../models");

const TeacherType = new GraphQLObjectType({
  name: "TeacherType",
  fields: {
    id: { type: GraphQLID },
    fullName: {
      type: GraphQLString,
      resolve: async (teacher) => {
        const user = await db.User.findByPk(teacher.userId);
        return user.fullName;
      },
    },
    email: {
      type: GraphQLString,
      resolve: async (teacher) => {
        const user = await db.User.findByPk(teacher.userId);
        return user.email;
      },
    },
  },
});

module.exports = TeacherType;
