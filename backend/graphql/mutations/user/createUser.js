const hash = require("password-hash");
const UserType = require("../../types/user/UserType");
const UserInputType = require("../../types/user/UserInputType");
const db = require("../../../models");

const createUser = {
  type: UserType,
  args: {
    user: { type: UserInputType },
  },
  resolve: async (_, { user }) => {
    const { fullName, email, password, role } = user;
    try {
      const passwordHash = hash.generate(password);

      const newUser = await db.User.create({
        fullName,
        email,
        passwordHash,
        role,
      });

      return newUser;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};

module.exports = createUser;
