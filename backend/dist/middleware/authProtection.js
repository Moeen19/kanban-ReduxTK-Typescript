var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
import User from "../db/models/userSchema.js";
import { CustomError } from "../dtos/CustomError.class.js";
function isJwt(token) {
    return token.userId !== undefined;
}
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    console.log(req.body, 'asdfjklj');
    token = req.body.token;
    if (token) {
        console.log(token, 'token recieved');
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            console.log(decoded);
            if (isJwt(decoded)) {
                const user = yield User.findById(decoded.userId).select("-password -__v -createdAt -updatedAt");
                if (!user) {
                    res.status(401).json({ msg: "Not authorized, no user found" });
                }
                req.user = user;
            }
            next();
        }
        catch (error) {
            res.status(401).json({ msg: `Not authorized, invalid token, ${error}` });
        }
    }
    else {
        const error = new CustomError("Not authorized, no token", 401);
        next(error);
    }
});
export { protect };
