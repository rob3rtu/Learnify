const { GraphQLString, GraphQLNonNull } = require("graphql");
const db = require("../../models");

const deleteCourse = {
  type: GraphQLString,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, args, context) => {
    const user = context.req.raw.user;
    const { id } = args;

    const course = await db.Class.findByPk(id);
    await course.destroy();

    return "ok";
  },
};

module.exports = deleteCourse;
