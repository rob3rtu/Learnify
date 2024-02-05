import express from "express";
import cors = require("cors");
import "dotenv/config";
import authRouter from "./routes/auth";
import { PrismaClient } from "@prisma/client";

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
