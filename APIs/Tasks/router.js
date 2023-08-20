const express = require("express")
const router = express.Router()
const { creaeTask, updateTask, deleteTask, completeTask, tasksByUsername } = require("./controler")

router.post("/create-task", creaeTask)

router.put("/update-task", updateTask)
router.delete("/delete-task", deleteTask)
router.put("/complete-task", completeTask)
router.get("/tasks-by-username/:username", tasksByUsername)

module.exports = router