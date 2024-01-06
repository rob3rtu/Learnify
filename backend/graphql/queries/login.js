const db = require("../../models");
const jwt = require("jsonwebtoken");
const { GraphQLString, GraphQLNonNull } = require("graphql");

const sendgrid = require("@sendgrid/mail");
require("dotenv").config();
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const login = {
  type: GraphQLString,
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_, args, context) => {
    const { email } = args;

    //find the user or create a new one if it doesn't exist
    const [user, created] = await db.User.findOrCreate({
      where: { email },
      defaults: {
        fullName: email.split("@")[0],
        role: "student",
      },
    });

    try {
      const token = jwt.sign(
        {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          profileImage: user.profileImage,
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );

      await sendgrid.send({
        to: email,
        from: process.env.SENDGRID_EMAIL,
        subject: "Log in to LERNIFY",
        html: `<a href='http://localhost:3000/confirm-email?token=${token}'>Log in</a>`,
      });
    } catch (err) {
      console.log(err.response.body.errors);
    }

    return "Check email";
  },
};

module.exports = login;
