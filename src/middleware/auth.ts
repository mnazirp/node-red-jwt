import express from "express";
import jwt from "jsonwebtoken";

export default function auth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const secret = <string>process.env.ACCESS_TOKEN_SECRET;
  try {
    const token = <string>req.headers["authorization"];
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.user = user;
        next();
      }
    });
  } catch (err) {
    next(err);
  }
}
