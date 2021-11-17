const express = require("express");
const {
    gettodo,
    addtodo,
    deletetodo,
} = require("../controllers/todoController");


const todoRouter = express.Router();

todoRouter.post("/todo", gettodo);
todoRouter.post("/add", addtodo);
todoRouter.post("/delete", deletetodo);



module.exports = todoRouter;
