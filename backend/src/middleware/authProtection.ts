import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../db/models/userSchema.js";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { CustomError } from "../dtos/CustomError.class.js";

interface UserInterface {
  _id: mongoose.Types.ObjectId
  name: string
  email: string
}

declare module "express-serve-static-core" {
  interface Request {
    user?: UserInterface | null
  }
}

function isJwt(token: string | JwtPayload): token is JwtPayload {
  return (token as JwtPayload).userId !== undefined
}

const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token: string;
  console.log(req.body, 'asdfjklj')
  
  token = req.body.token;

  const secret = process.env.ACCESS_TOKEN_SECRET || "DefaultSecret"
  
  if (token) {
    console.log(token, 'token recieved')
    try {
      const decoded = jwt.verify(token, secret);
      console.log(decoded)
      if(isJwt(decoded)) {
        const user = await User.findById(decoded.userId as JwtPayload).select("-password -__v -createdAt -updatedAt");
        if(!user) {
          res.status(401).json({msg: "Not authorized, no user found"})
        }
        req.user = user
      }
      next();
    } catch (error) {
      res.status(401).json({msg: `Not authorized, invalid token, ${error}`})
    }
  } else {
    const error =  new CustomError("Not authorized, no token", 401);
    next(error)
  }
};

export { protect }
