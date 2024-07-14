import User from "../db/models/userSchema.js";
import generateToken from "../utils/generateToken.js";
import Todo from "../db/models/todoSchema.js"
import { NextFunction, Request, Response } from "express";

// @desc    Auth/Login a user
// @route   POST /users/login
// @access  Public
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(res, user._id)
    });
  } else {
    res.status(401).json({ msg: "Invalid Email or Password" })
  }
};

// @desc    Register a new user
// @route   POST /users
// @access  Public
const registerUser = async (req: Request, res: Response, next: NextFunction) => {

  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    const error = new Error("User already Exists");
    next(error);
  } else {
    const user = await User.create({
      name,
      email,
      password,
    });
    const todo = await Todo.create({
      user: user._id,
      title: "Learn Nextjs",
      description: "Learn Next by building projects",
      isDone: false,
    })
    console.log(todo)

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400).json({ msg: "Invalid User data" })

    }
  }
};

// @desc    Logout user
// @route   POST /users/logout
// @access  Public
const logoutUser = async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ msg: "User logged Out" });
};

export { registerUser, loginUser, logoutUser };
