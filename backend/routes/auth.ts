import express from "express";
import { PrismaClient, enum_Users_role } from "@prisma/client";
import sgMail from "@sendgrid/mail";
import { decode, sign } from "jsonwebtoken";

const authRouter = express.Router();
sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? "");
const prisma = new PrismaClient();

const loginHtml = (redirectUrl: string) => {
  return `
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Register</title>
  </head>
  <body style="background-color: white">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center" style="padding-top: 20px">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/licenta-fmi.appspot.com/o/diverse%2Flogo.png?alt=media&token=6fe3f1c4-1c28-40a7-880b-06aa2be6fdff"
            alt="logo"
            title="logo"
            style="display: block"
            width="362"
            height="88"
          />
        </td>
      </tr>
      <tr>
        <td align="center" style="padding-top: 20px">
          <p style="margin-top: 40px; margin-bottom: 100px; font-size: 20px">
            Welcome! Now you can safely follow this
            <span><a href="${redirectUrl}">link</a></span> to enter the app.
          </p>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding-top: 20px">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/licenta-fmi.appspot.com/o/diverse%2Fbottom.png?alt=media&token=1baffc8d-10ac-4bf7-8e16-3ac13b0c0198"
            alt="bottom"
            title="bottom"
            style="display: block"
            width="199"
            height="110"
          />
        </td>
      </tr>
    </table>
  </body>
</html>

`;
};

authRouter.get("/verify-token/:token", async (req, res) => {
  const token = req.params.token;
  const user = decode(token);

  if (user === null) {
    return res.sendStatus(404);
  }

  //@ts-ignore
  if (user.id) {
    //@ts-ignore
    const fullUser = await prisma.user.findFirst({ where: { id: user.id } });
    return res.json({ fullUser });
  } else {
    try {
      const fullUser = await prisma.user.create({
        data: {
          //@ts-ignore
          email: user.email,
          //@ts-ignore
          fullName: user.email.split("@")[0],
          role: enum_Users_role.student,
        },
      });

      const token = sign(
        {
          id: fullUser.id,
          fullName: fullUser.fullName,
          email: fullUser.email,
          role: fullUser.role,
          profileImage: fullUser.profileImage,
        },
        process.env.JWT_KEY ?? "",
        { expiresIn: "1h" }
      );

      return res.json({ fullUser, token });
    } catch (error) {
      return res.status(500);
    }
  }
});

authRouter.post("/login/:email", async (req, res) => {
  const email = req.params.email;

  if (
    !email.match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) ||
    !email.endsWith("unibuc.ro")
  ) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  let user = await prisma.user.findFirst({ where: { email } });

  try {
    const token = sign(
      user === null
        ? {
            email,
          }
        : {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage,
          },
      process.env.JWT_KEY ?? "",
      { expiresIn: "1h" }
    );

    await sgMail.send({
      to: email,
      from: process.env.SENDGRID_EMAIL ?? "",
      subject: "Log in to LERNIFY",
      html: loginHtml(
        `${process.env.FRONTEND_HOST}/confirm-email?token=${token}`
      ),
    });
  } catch (error) {
    return res.status(500).json({ error: "Email not sent." });
  }

  return res.sendStatus(200);
});

export default authRouter;
