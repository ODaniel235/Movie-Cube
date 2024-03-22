import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../Models/SchemaModel.js";
import AppError from "../appError.js";
dotenv.config();
export const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWTSECRET, {
    expiresIn: process.env.JWTEXPIRES,
  });
};
export const signup = async (req, res) => {
  try {
    const newUser = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    const token = signToken(newUser._id);
    res.status(200).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getUsers = async (req, res) => {
  try {
    const getUsers = await UserModel.find({});
    res.status(200).json(getUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    //Check if password || email is valid
    if (!email || !password) {
      return next(AppError("Please provide email and password", 400));
    }

    //check if user is in our database
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect email or password", 401));
    }
    //If everything is ok, send a token
    const token = signToken(user._id);
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const protectedRoute = async (req, res, next) => {
  try {
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
