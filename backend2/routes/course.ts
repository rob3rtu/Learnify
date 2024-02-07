import { PrismaClient } from "@prisma/client";
import type { enum_Classes_domain } from "@prisma/client";
import express from "express";

const courseRouter = express.Router();
const prisma = new PrismaClient();

interface CourseDTO {
  longName: string;
  shortName: string;
  year: number;
  semester: number;
  domain: enum_Classes_domain;
}

courseRouter.get("/all", async (req, res) => {
  const courses = await prisma.class.findMany();

  res.json({
    courses,
  });
});

courseRouter.post("/new", async (req, res) => {
  const course = req.body.course as CourseDTO;

  try {
    await prisma.class.create({ data: course });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

courseRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await prisma.class.delete({ where: { id } });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default courseRouter;
