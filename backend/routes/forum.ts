import { PrismaClient } from "@prisma/client";
import express from "express";
const forumRouter = express.Router();
const prisma = new PrismaClient();

interface NewMessageDTo {
  forumId: string;
  userId: string;
  message: string;
}

//get forum
forumRouter.get("/:id", async (req, res) => {
  const classId = req.params.id;

  try {
    const forum = await prisma.forum.findFirst({
      where: { classId },
      include: {
        messages: { include: { user: true }, orderBy: { createdAt: "asc" } },
      },
    });

    if (forum === null) return res.sendStatus(404);

    return res.json(forum);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

//post new message to forum
forumRouter.post("/new", async (req, res) => {
  const newMessage = req.body as NewMessageDTo;
  try {
    const createdMessage = await prisma.message.create({ data: newMessage });

    const forum = await prisma.forum.findFirst({
      where: { id: createdMessage.forumId ?? "" },
      include: {
        messages: { include: { user: true }, orderBy: { createdAt: "asc" } },
      },
    });

    return res.json(forum);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

export default forumRouter;
