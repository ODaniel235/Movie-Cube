/* import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import router from "./route.js";
import router from "./route.js";
dotenv.config();
const connectString = process.env.URL;
const app = express();
app.use(express.json());
const staticDir = path.join(process.cwd(), "/");

app.get("/", (req, res) => {
  res.sendFile(path.join(staticDir, "index.html"));
});

app.use("/products", router);
app.use()
mongoose
  .connect(connectString)
  .then(() => {
    console.log("Connected to server");
    app.listen(3000, () => {
      console.log("Server is listening");
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.status(201).send("<h1>Hello</h1>");
});
*/
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./Routes/routes.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(router);
const connectString = process.env.URL;
mongoose
  .connect(connectString)
  .then(() => {
    console.log("Connected to server");
    app.listen(3000, () => {
      console.log("Server is listening");
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.status(201).send("<h1>Hello</h1>");
});
