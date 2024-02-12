import { PrismaClient } from "@prisma/client";
import express from "express";

const postRouter = express.Router();
const prisma = new PrismaClient();

postRouter.post("/new", async (req, res) => {
  const newPost = req.body;

  try {
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

export default postRouter;
