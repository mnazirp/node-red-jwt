import express from "express";
import jwt from "jsonwebtoken";
import template from "../template.json";

// const secret = <string>process.env.ACCESS_TOKEN_SECRET;
export default function auth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const jwtCookie = req.cookies?.Protenga;
    const url = "uiAdmin";
    if (jwtCookie) {
      check(jwtCookie, req, res, next);
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    next(err);
  }
}

function check(
  token: string,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  jwt.verify(token, <string>process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.cookie("Protenga", token, {
        maxAge: template.expSeconds,
        httpOnly: false,
      });
      req.user = user;
      next();
    }
  });
}
