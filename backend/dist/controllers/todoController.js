var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Todo from "../db/models/todoSchema.js";
// @desc    Get all todos
// @route   GET /api/todos
const getAllTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    console.log(user, "getUserId");
    const todo = yield Todo.find();
    console.log(todo);
    const todos = yield Todo.find({ user: user });
    console.log(todos);
    res.status(200).json(todos);
});
// @desc    Create new todo
// @route   POST /todos
const createTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const { title, description } = req.body;
        console.log(req.body);
        if (!title || !description) {
            const error = new Error("Please fill out the given fields");
            res.status(400);
            console.log("todo", title, description);
            return next(error);
        }
        const todo = yield Todo.create({
            user,
            title,
            description,
            isDone: false,
        });
        const todos = yield Todo.find({ user: user });
        res.status(201).json(todos);
    }
    catch (error) {
        res.status(400).json({ msg: `${error}` });
    }
});
// @desc    Delete a todo
// @route   DELETE /todos
const deleteTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const _id = req.body._id;
        console.log(req.body);
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        yield Todo.deleteOne({ _id: _id });
        const todos = yield Todo.find({ user: userId });
        res.status(200).json(todos);
    }
    catch (error) {
        res.status(500).json({ msg: `${error}` });
    }
});
// @desc    Update a todo
// @route   PUT /todos
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { _id, title, description, status } = req.body;
        console.log(req.body);
        const todo = yield Todo.findOne({ _id: _id, user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
        if (todo) {
            todo.title = title || todo.title;
            todo.description = description || todo.description;
            if (status === true) {
                todo.isDone = true;
            }
            else if (status === false) {
                todo.isDone = false;
            }
            const updatedTodo = yield todo.save();
            const todos = yield Todo.find({ user: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id });
            res.status(200).json(todos);
        }
        else {
            res.status(404).json({ msg: "Error: Todo Not Found" });
        }
    }
    catch (error) {
        res.status(400).json({ msg: error.message });
    }
});
export { getAllTodos, createTodo, deleteTodo, updateTodo };
