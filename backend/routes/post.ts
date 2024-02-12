import {
  PrismaClient,
  enum_Class_section,
  enum_Resource_type,
} from "@prisma/client";
import express from "express";

const postRouter = express.Router();
const prisma = new PrismaClient();

interface PostDTO {
  classId: string;
  userId: string;
  title: string;
  description: string;
  resourceType: enum_Resource_type;
  resourceUrl: string;
  classSection: enum_Class_section;
}

postRouter.post("/new", async (req, res) => {
  const newPost = req.body as PostDTO;

  try {
    await prisma.post.create({ data: newPost });

    const updatedClass = await prisma.class.findFirst({
      where: { id: newPost.classId },
      include: { posts: { include: { user: true } } },
    });

    return res.json(updatedClass);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

postRouter.delete("/:id", async (req, res) => {
  try {
    await prisma.post.delete({ where: { id: req.params.id } });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

export default postRouter;
