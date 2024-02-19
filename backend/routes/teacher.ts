import { PrismaClient } from "@prisma/client";
import express from "express";

const teacherRouter = express.Router();
const prisma = new PrismaClient();

teacherRouter.get("/all", async (req, res) => {
  try {
    const teachers = await prisma.teacher.findMany({
      include: {
        user: true,
      },
    });

    res.json(teachers);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default teacherRouter;
