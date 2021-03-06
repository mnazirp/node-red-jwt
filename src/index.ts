import http from "http";
import express from "express";
import RED from "node-red";
import jwt from "jsonwebtoken";
import template from "./template.json";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import auth from "./middleware/auth";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/", express.static("public"));
const server = http.createServer(app);
const settings = {
  flowFile: "flows.json",
  flowFilePretty: true,
  httpAdminRoot: "/red",
  httpNodeRoot: "/api",
  userDir: ".nodered",
  functionGlobalContext: {},
  uiPort: Number(process.env.PORT) || 1880,
  uiHost: <string>process.env.HOST || "0.0.0.0",
};
// app.all("/red/*", auth, RED.httpAdmin);
RED.init(server, settings);
app.use(settings.httpAdminRoot, auth, RED.httpAdmin);
app.use(settings.httpNodeRoot, auth, RED.httpNode);
server.listen(settings.uiPort, () => {
  console.log(`server ready on port: ${settings.uiPort}`);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const sercret = <string>process.env.ACCESS_TOKEN_SECRET;
  if (username && username !== "" && password && password !== "") {
    const accessToken = jwt.sign({ username, password }, sercret, {
      expiresIn: `${template.expSeconds}s`,
      mutatePayload: true,
    });
    res.cookie("Protenga", accessToken, {
      maxAge: template.expSeconds,
      httpOnly: false,
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(403);
    res.send();
  }
});

RED.start()
  .then(() => {
    console.log("Node RED is running");
  })
  .catch((err) => {
    console.error("something wrong: ", err.message);
  });
