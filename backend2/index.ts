import { PrismaClient } from "@prisma/client";
import express from "express";
import cors = require("cors");

const prisma = new PrismaClient();

const port = 3001;
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
