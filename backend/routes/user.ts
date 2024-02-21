import { PrismaClient, enum_Users_role } from "@prisma/client";
import express from "express";

const userRouter = express.Router();
const prisma = new PrismaClient();

interface UserDTO {
  email: string;
  role: enum_Users_role;
}

userRouter.get("/posts", async (req, res) => {
  const user = req.user;

  try {
    const posts = await prisma.post.findMany({
      where: { userId: user?.id },
      include: {
        user: true,
        likes: true,
        comments: { include: { user: true } },
      },
    });

    return res.json({
      posts,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

userRouter.put("/update-profile-image", async (req, res) => {
  const user = req.user;
  const imageUrl = req.body.url;

  try {
    await prisma.user.update({
      where: { id: user?.id },
      data: { profileImage: imageUrl },
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

userRouter.post("/new", async (req, res) => {
  const user = req.body.user as UserDTO;

  try {
    const createdUser = await prisma.user.create({
      data: {
        fullName: user.email.split("@")[0],
        ...user,
      },
    });

    if (user.role === "teacher") {
      await prisma.teacher.create({
        data: {
          userId: createdUser.id,
        },
      });
    }

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

userRouter.get("/all", async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

userRouter.delete("/delete/:id", async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: req.params.id } });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

export default userRouter;
