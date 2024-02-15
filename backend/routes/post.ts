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
      include: {
        posts: {
          include: {
            user: true,
            likes: true,
            comments: { include: { user: true } },
          },
        },
      },
    });

    return res.json(updatedClass);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

postRouter.put("/edit/:id", async (req, res) => {
  const newData = req.body;

  try {
    const updatedPost = await prisma.post.update({
      where: { id: req.params.id },
      data: newData,
    });

    const updatedClass = await prisma.class.findFirst({
      where: { id: updatedPost.classId ?? undefined },
      include: {
        posts: {
          include: {
            user: true,
            likes: true,
            comments: { include: { user: true } },
          },
        },
      },
    });

    return res.json(updatedClass);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

postRouter.post("/toggle-like/:id", async (req, res) => {
  const userId = req.user?.id;
  const postId = req.params.id;

  try {
    const like = await prisma.like.findFirst({ where: { postId, userId } });

    if (like === null) {
      //if there is no like, we create one
      await prisma.like.create({
        data: {
          postId,
          userId,
        },
      });
    } else {
      //if the like exists, we delete it
      await prisma.like.delete({ where: { id: like.id } });
    }

    //return updated post
    const updatedPost = await prisma.post.findFirst({
      where: { id: postId },
      include: {
        user: true,
        likes: true,
        comments: { include: { user: true } },
      },
    });
    return res.json(updatedPost);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

postRouter.post("/comment/:id", async (req, res) => {
  const userId = req.user?.id;
  const postId = req.params.id;
  const message = req.body.message;

  try {
    await prisma.comment.create({
      data: {
        userId,
        postId,
        message,
      },
    });

    //return updated post
    const updatedPost = await prisma.post.findFirst({
      where: { id: postId },
      include: {
        user: true,
        likes: true,
        comments: { include: { user: true } },
      },
    });
    return res.json(updatedPost);
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
