import { Request, Response, NextFunction } from "express";
import { decode } from "jsonwebtoken";

const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers["authorization"];
  const token = header?.split(" ")[1];

  // if (
  //   !req.originalUrl.includes("login") &&
  //   (token === undefined || token === null || token == "")
  // ) {
  //   res.sendStatus(401);
  //   return;
  // }

  // try {
  const user = decode(token ?? "");

  // if (
  //   !req.originalUrl.includes("login") &&
  //   (user === null || user === undefined)
  // ) {
  //   res.sendStatus(404);
  // } else {
  //@ts-ignore
  req.user = user;
  next();
  //     return;
  //   }
  // } catch (error) {
  //   console.log(error);
  //   res.sendStatus(401);
  //   return;
  // }
};

export default authorization;
