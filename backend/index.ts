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
import { createServer } from "http";
import { Server } from "socket.io";

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

const expressServer = createServer(app);
const io = new Server(expressServer, { cors: { origin: "*" } });

expressServer.listen(port, async () => {
  console.log(`App running on port ${port}`);
  await checkDbConnection();
});

io.listen(3002);

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("send-message", async (message) => {
    try {
      const createdMessage = await prisma.message.create({ data: message });

      const forum = await prisma.forum.findFirst({
        where: { id: createdMessage.forumId ?? "" },
        include: {
          messages: { include: { user: true }, orderBy: { createdAt: "desc" } },
        },
      });

      socket.broadcast.emit("message-response", forum);
    } catch (error) {
      console.log(error);
      // return res.sendStatus(500);
    }
  });
});
