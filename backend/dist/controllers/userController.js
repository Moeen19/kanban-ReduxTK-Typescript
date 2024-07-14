var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../db/models/userSchema.js";
import generateToken from "../utils/generateToken.js";
import Todo from "../db/models/todoSchema.js";
// @desc    Auth/Login a user
// @route   POST /users/login
// @access  Public
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User.findOne({ email });
    if (user && (yield user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(res, user._id)
        });
    }
    else {
        res.status(401).json({ msg: "Invalid Email or Password" });
    }
});
// @desc    Register a new user
// @route   POST /users
// @access  Public
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const userExists = yield User.findOne({ email });
    if (userExists) {
        res.status(400);
        const error = new Error("User already Exists");
        next(error);
    }
    else {
        const user = yield User.create({
            name,
            email,
            password,
        });
        const todo = yield Todo.create({
            user: user._id,
            title: "Learn Nextjs",
            description: "Learn Next by building projects",
            isDone: false,
        });
        console.log(todo);
        if (user) {
            generateToken(res, user._id);
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
            });
        }
        else {
            res.status(400).json({ msg: "Invalid User data" });
        }
    }
});
// @desc    Logout user
// @route   POST /users/logout
// @access  Public
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ msg: "User logged Out" });
});
export { registerUser, loginUser, logoutUser };
