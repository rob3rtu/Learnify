import express from "express";
import cors = require("cors");
import "dotenv/config";
import authRouter from "./routes/auth";
import { PrismaClient } from "@prisma/client";
import userRouter from "./routes/user";
import authorization from "./middlewares/authorization";
import courseRouter from "./routes/course";
import teacherRouter from "./routes/teacher";
import postRouter from "./routes/post";
import forumRouter from "./routes/forum";

require("dotenv").config();

const prisma = new PrismaClient();

const port = 3001;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.send("Hello there");
});

app.use("/api/auth", authRouter);
app.use(authorization);
app.use("/api/user", userRouter);
app.use("/api/course", courseRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/post", postRouter);
app.use("/api/forum", forumRouter);

const checkDbConnection = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("Database connected");
  } catch (error) {
    console.log("Database missing");
  }
};

app.listen(port, async () => {
  console.log(`App running on port ${port}`);
  await checkDbConnection();
});
