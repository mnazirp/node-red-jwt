import http from "http";
import express from "express";
import RED from "node-red";
import jwt from "jsonwebtoken";
import template from "./template.json";
import fs from "fs";

const app = express();
const port = 3001;
const privateKey = fs.readFileSync("private.key");
const renderInstruction = (req: express.Request, res: express.Response) => {
  res.send("You need to post a user name, claim details are local here");
};
const renderJwt = (req: express.Request, res: express.Response) => {
  const claim = { sub: req.body.toString(), template };
  const bearer = jwt.sign(claim, privateKey, {
    algorithm: "RS256",
    expiresIn: `${template.expSeconds}s`,
    mutatePayload: true,
  });
  res.json({ bearer: bearer, ...claim });
};

app.use(express.raw({ type: "text/plain" }));
app.get("/", renderInstruction);
app.post("/", renderJwt);

app.listen(port, () => {
  console.log(`Ready on port ${port}`);
});
