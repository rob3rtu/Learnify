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
  <body
    style="
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 20px;
      background-color: white;
    "
  >
    <img
      src="https://firebasestorage.googleapis.com/v0/b/licenta-fmi.appspot.com/o/diverse%2Flogo.svg?alt=media&token=04bb5d1f-6433-4170-a2d0-a3241ea4e8e1"
    />
    <p style="margin-top: 40px; margin-bottom: 100px">
      Welcome! Now you can safely follow this
      <span><a href="${redirectUrl}">link</a></span> to enter the app.
    </p>
    <img
      src="https://firebasestorage.googleapis.com/v0/b/licenta-fmi.appspot.com/o/diverse%2Fbottom.svg?alt=media&token=56bd25dc-a504-484d-bf14-89fa6da634d5"
    />
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
  const fullUser = await prisma.user.findFirst({ where: { id: user.id } });

  res.json(fullUser);
});

authRouter.post("/login/:email", async (req, res) => {
  const email = req.params.email;

  let user = await prisma.user.findFirst({ where: { email } });

  //if there is no user, create one with this email
  //maybe change this behaviour in the future
  if (user === null) {
    user = await prisma.user.create({
      data: {
        email,
        fullName: email.split("@")[0],
        role: enum_Users_role.student,
      },
    });
  }

  try {
    const token = sign(
      {
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
      html: loginHtml(`http://localhost:3000/confirm-email?token=${token}`),
    });
  } catch (error) {
    return res.status(500).json({ error: "Email not sent." });
  }

  res.sendStatus(200);
});

export default authRouter;
