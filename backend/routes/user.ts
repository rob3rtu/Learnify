import { PrismaClient, enum_Users_role } from "@prisma/client";
import express from "express";
import rolePermission from "../middlewares/rolePermission";

const userRouter = express.Router();
const prisma = new PrismaClient();

interface UserDTO {
  email: string;
  role: enum_Users_role;
}

//get user's posts
userRouter.get("/posts", async (req, res) => {
  const user = req.user;

  try {
    const posts = await prisma.post.findMany({
      where: { userId: user?.id },
      orderBy: { createdAt: "desc" },
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

//change a user's role
userRouter.put(
  "/change-role/:role/:userId",
  rolePermission(["admin"]),
  async (req, res) => {
    const newRole = req.params.role as enum_Users_role;

    try {
      const oldUser = await prisma.user.findFirst({
        where: { id: req.params.userId },
      });

      await prisma.user.update({
        where: { id: req.params.userId },
        data: { role: newRole },
      });

      if (oldUser?.role === "teacher") {
        await prisma.teacher.delete({ where: { userId: oldUser.id } });
      }

      if (newRole === "teacher") {
        await prisma.teacher.create({ data: { userId: oldUser?.id } });
      }

      const newUsersArray = await prisma.user.findMany();

      return res.json(newUsersArray);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
);

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

userRouter.get("/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const userDetails = await prisma.user.findFirst({
      where: { id: userId },
      include: {
        posts: { include: { user: true, likes: true, comments: true } },
      },
    });

    return res.json(userDetails);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

userRouter.delete(
  "/delete/:id",
  rolePermission(["admin"]),
  async (req, res) => {
    try {
      await prisma.user.delete({ where: { id: req.params.id } });
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
);

export default userRouter;
