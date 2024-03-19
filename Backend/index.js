import express from "express";
import mongoose from "mongoose";
import { LINK } from "./config.js";
import { User } from "./users.js";
const cube = express();
cube.use(express());

//Adding a user
cube.post("/users", async (req, res) => {
  try {
    if (!req.body.email || req.body.password) {
      res.status(450).send("Please fill out all fields");
    }
    const newUser = {
      email: req.email,
      password: req.password,
    };
    const addUser = await User.create(newUser);
    return res.status(201).send(addUser);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Could not log you in" });
  }
});

//Fetching all users
cube.get("/users", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).send(allUsers);
  } catch (error) {
    console.log(error);
    return res.status(501).send({ message: "Could not fetch" });
  }
});
mongoose
  .connect(LINK)
  .then(() => {
    console.log("Connected");
    cube.listen(5555, () => {
      console.log("Welcome");
    });
  })
  .catch((error) => {
    console.log(error);
  });
