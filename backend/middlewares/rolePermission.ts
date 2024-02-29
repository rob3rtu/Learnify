import { Request, Response, NextFunction } from "express";
import { enum_Users_role } from "@prisma/client";

//check if the role required matches the role of the user
const rolePermission = (roles: enum_Users_role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user === undefined || user.role === null) return res.sendStatus(401);

    if (!roles.includes(user.role)) return res.sendStatus(403);

    next();
    return;
  };
};

export default rolePermission;
