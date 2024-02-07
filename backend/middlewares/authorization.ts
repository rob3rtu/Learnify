import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { decode } from "jsonwebtoken";

const prisma = new PrismaClient();

const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers["authorization"];
  const token = header?.split(" ")[1];

  if (token === undefined || token === null) {
    res.sendStatus(401);
  }

  try {
    const user = decode(token ?? "");
    //@ts-ignore
    const fullUser = await prisma.user.findFirst({ where: { id: user.id } });

    if (fullUser === null) {
      res.sendStatus(404);
    } else {
      req.user = fullUser;
      next();
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
  }
};

export default authorization;
