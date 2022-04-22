const pool = require("../db");
const statusCodes = require("../statusCodes");

const checkIfTodoExists = async (req,res,next) => {
    const {id} = req.params;
    try {
        const response = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
        if (response.rows.length > 0) {
            req.todo_id = id;
            next();
        } else {
            res.status(statusCodes.BAD_REQUEST).json({message: `todo with id ${id} does not exist`})
        }
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = {
    checkIfTodoExists
}