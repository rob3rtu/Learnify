import { Request, Response, NextFunction } from "express";
import { decode } from "jsonwebtoken";

//check if there is a token in the auth header and if it belongs to an existing user
const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers["authorization"];
  const token = header?.split(" ")[1];

  if (token === undefined || token === null || token == "") {
    return res.sendStatus(401);
  }

  try {
    const user = decode(token ?? "");
    const currentTime = new Date();

    //token expired
    //@ts-ignore
    if (user?.exp < currentTime.getTime() / 1000) {
      return res.sendStatus(401);
    }

    if (user === null || user === undefined) {
      return res.sendStatus(404);
    } else {
      //@ts-ignore
      req.user = user;
      next();
      return;
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export default authorization;
