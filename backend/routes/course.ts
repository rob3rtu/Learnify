import { PrismaClient } from "@prisma/client";
import type { enum_Classes_domain } from "@prisma/client";
import express from "express";
import rolePermission from "../middlewares/rolePermission";

const courseRouter = express.Router();
const prisma = new PrismaClient();

interface CourseDTO {
  longName: string;
  shortName: string;
  year: number;
  semester: number;
  domain: enum_Classes_domain;
}

interface NewTeacherDTO {
  classId: string;
  teacherId: string;
}

//get all courses
courseRouter.get("/all", async (req, res) => {
  const user = req.user;

  const courses = await prisma.class.findMany();

  if (user?.role !== "teacher")
    return res.json({
      courses,
    });

  //if is a teacher get him only his classes
  const teacher = await prisma.teacher.findFirst({
    where: { userId: user.id },
    include: { classTeachers: true },
  });

  const hisClassesIds = teacher?.classTeachers.map((record) => record.classId);
  return res.json({
    courses: courses.filter((course) => hisClassesIds?.includes(course.id)),
  });
});

//get course by id
courseRouter.get("/:id", async (req, res) => {
  try {
    const course = await prisma.class.findFirst({
      where: { id: req.params.id },
      include: {
        posts: {
          orderBy: { createdAt: "desc" },
          include: {
            user: true,
            likes: true,
            comments: { include: { user: true } },
          },
        },
      },
    });

    if (course === null) {
      return res.sendStatus(404);
    }

    return res.json(course);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

//create new course
courseRouter.post(
  "/new",
  rolePermission(["admin"]),

  async (req, res) => {
    const course = req.body.course as CourseDTO;

    try {
      const createdCourse = await prisma.class.create({ data: course });

      const newCourses = await prisma.class.findMany();

      await prisma.forum.create({
        data: {
          classId: createdCourse.id,
        },
      });

      return res.json({ courses: newCourses });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
);

//get class teachers
courseRouter.get("/teachers/:id", async (req, res) => {
  const classId = req.params.id;

  try {
    const classTeachers = await prisma.classTeachers.findMany({
      where: {
        classId,
      },
      include: {
        teacher: { include: { user: true } },
      },
    });

    const allTeachers = await prisma.teacher.findMany({
      include: {
        user: true,
      },
    });

    //all theachers that are not in my class
    const restOfTeachers = allTeachers.filter(
      (teacher) =>
        !classTeachers.map((tch) => tch.teacher?.id).includes(teacher.id)
    );

    return res.json({ classTeachers, restOfTeachers });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

//add teacher to class
courseRouter.post(
  "/teachers/new",
  rolePermission(["teacher", "admin"]),
  async (req, res) => {
    const newTeacher = req.body as NewTeacherDTO;

    try {
      await prisma.classTeachers.create({ data: newTeacher });

      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
);

//delete teacher from class
courseRouter.delete(
  "/teachers/delete/:id",
  rolePermission(["teacher", "admin"]),
  async (req, res) => {
    const recordId = req.params.id;

    try {
      await prisma.classTeachers.delete({ where: { id: recordId } });

      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
);

//delete class
courseRouter.delete(
  "/delete/:id",
  rolePermission(["admin"]),
  async (req, res) => {
    const id = req.params.id;

    try {
      await prisma.class.delete({ where: { id } });
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
);

export default courseRouter;
