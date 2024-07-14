import { NextFunction, Request, Response } from "express";
import { CustomError } from "../dtos/CustomError.class.js";

// Not Found Middleware
const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new CustomError("Not Found", 404);
    next(error);
  };
  
  export default notFound;