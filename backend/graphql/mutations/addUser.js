const { GraphQLString } = require("graphql");
const UserInputType = require("../types/user/UserInputType");
const db = require("../../models");

const addUser = {
  type: GraphQLString,
  args: {
    newUser: { type: UserInputType },
  },
  resolve: async (_, args, context) => {
    const user = context.req.raw.user;
    const { newUser } = args;

    try {
      const newUserCreated = await db.User.create({
        fullName: newUser.email.split("@")[0],
        ...newUser,
      });

      if (newUser.role === "teacher") {
        await db.Teacher.create(
          { userId: newUserCreated.id },
          { returning: ["id", "userId", "createdAt", "updatedAt"] }
        );
      }

      return "ok";
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user.");
    }
  },
};

module.exports = addUser;
