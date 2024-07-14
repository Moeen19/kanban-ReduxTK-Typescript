import { NextFunction, Request, Response } from "express";
import { CustomError } from "../dtos/CustomError.class";

// Custom Error Handler Middleware
const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (err.status) {
      res.status(err.status).json({ msg: err.message });
    } else {
      res.status(500).json({ msg: err.message });
    }
  };
  
  export default errorHandler;
  