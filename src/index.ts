import http from "http";
import express from "express";
import RED from "node-red";
import jwt from "jsonwebtoken";
import template from "./template.json";
import fs from "fs";

const app = express();
app.use("/", express.static("public"));
const server = http.createServer(app);
const settings = {
  httpAdminRoot: "/red",
  httpNodeRoot: "/api",
  userDir: "/home/nol/.nodered/",
  functionGlobalContext: {},
  uiPort: 1880,
  uiHost: "0.0.0.0",
};
RED.init(server, settings);
app.use(settings.httpAdminRoot, RED.httpAdmin);
app.use(settings.httpNodeRoot, RED.httpNode);
server.listen(settings.uiPort, () => {
  console.log(`server ready on port: ${settings.uiPort}`);
});

RED.start();

// const app = express();
// const port = 3001;
// const privateKey = fs.readFileSync("private.key");
// const renderInstruction = (req: express.Request, res: express.Response) => {
//   res.send("You need to post a user name, claim details are local here");
// };
// const renderJwt = (req: express.Request, res: express.Response) => {
//   const claim = { sub: req.body.toString(), template };
//   const bearer = jwt.sign(claim, privateKey, {
//     algorithm: "RS256",
//     expiresIn: `${template.expSeconds}s`,
//     mutatePayload: true,
//   });
//   res.json({ bearer: bearer, ...claim });
// };

// app.use(express.raw({ type: "text/plain" }));
// app.get("/", renderInstruction);
// app.post("/", renderJwt);

// app.listen(port, () => {
//   console.log(`Ready on port ${port}`);
// });
