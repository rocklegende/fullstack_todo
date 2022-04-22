const express = require("express");
const pool = require("./db");
const statusCodes = require("./statusCodes");
const {BadRequestError} = require("./customErrors")
const {checkIfTodoExists} = require("./middleware/todoValidationMiddleware")
const {checkAuth} = require("./middleware/authMiddleware");

const app = express();

// parses the json body of a request and makes it available inside req.body
app.use(express.json());

// check if authorization token is valid, makes user information available in req.user afterwards
app.use(checkAuth);

app.post("/todo", async (req, res, next) => {
    let {description, user_id} = req.body;

    if (!description) {
        // pass error to error handling middleware
        // important to immediately return here or we would call the other stuff down below
        next(new BadRequestError("'description' is missing in body"))
        return;
    }

    if (!user_id) {
        // pass error to error handling middleware
        // important to immediately return here or we would call the other stuff down below
        next(new BadRequestError("'user_id' is missing in body"))
        return;
    }

    try {
        let newTodo = await pool.query("INSERT INTO todo(description, user_id) VALUES ($1, $2) RETURNING *", [description, user_id])
        res.status(statusCodes.CREATED).json(newTodo.rows[0]);
    } catch (err) {
        // pass error to error handling middleware
        next(err)
    }
})

app.get("/todo", async (req, res, next) => {
    try {
        // pool.query can potentially fail, therefore wrap in try catch block
        let response = await pool.query("SELECT * FROM todo")
        res.status(statusCodes.OK).json(response.rows);
    } catch (err) {
        // pass error to error handling middleware
        next(err)
    }
})

app.delete("/todo/:id", checkIfTodoExists, async (req, res, next) => {
    try {
        let deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [req.todo_id])
        res.status(statusCodes.SUCCESSFUL_DELETE).json(deleteTodo.rows[0]);
    } catch (err) {
        // pass error to error handling middleware
        next(err)
    }
})

app.put("/todo/:id", checkIfTodoExists, async (req, res,next) => {
    if (!req.body.description) {
        // pass error to error handling middleware
        // important to immediately return here or we would call the other stuff down below
        next(new BadRequestError("'description' is missing in body"))
        return;
    }
    try {
        let updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [req.body.description, req.todo_id])
        console.log(updateTodo);
        res.status(statusCodes.OK).json(updateTodo.rows[0]);
    } catch (err) {
        // pass error to error handling middleware
        next(err)
    }
})

// 404 page
app.use((req, res) => {
    res.status(statusCodes.NOT_FOUND).json({
        message: "Page not found!"
    });
})

// 500 page
app.use((err, req, res, next) => {
    const statusCode = err.statusCode ? err.statusCode : statusCodes.SERVER_ERROR;
    res.status(statusCode).json({
        message: err.message
    });
})

module.exports = app;