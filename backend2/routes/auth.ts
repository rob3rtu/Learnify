import express from "express";
import { PrismaClient, enum_Users_role } from "@prisma/client";
import sgMail from "@sendgrid/mail";
import { decode, sign } from "jsonwebtoken";

const authRouter = express.Router();
sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? "");
const prisma = new PrismaClient();

authRouter.get("/verify-token/:token", async (req, res) => {
  const token = req.params.token;
  const user = decode(token);

  if (user === null) {
    res.sendStatus(404);
  }

  //@ts-ignore
  const fullUser = await prisma.user.findFirst({ where: { id: user.id } });

  res.json(fullUser);
});

authRouter.post("/login", async (req, res) => {
  const email = req.body.email;

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
      html: `<a href='http://localhost:3000/confirm-email?token=${token}'>Log in</a>`,
    });
  } catch (error) {
    res.status(500).json({ error: "Email not sent." });
  }

  res.sendStatus(200);
});

export default authRouter;
