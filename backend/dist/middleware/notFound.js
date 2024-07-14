import { CustomError } from "../dtos/CustomError.class.js";
// Not Found Middleware
const notFound = (req, res, next) => {
    const error = new CustomError("Not Found", 404);
    next(error);
};
export default notFound;
