const { connect } = require('mongoose')
require('dotenv').config()
const Task = require('./model')

const creaeTask = async (req, res) => {

    const { text, complete, username } = req.body

    if ( !text || !username) {
        res.status(403).json({
            message: "Invalid Values"
        })
    }
    else {
        try {
            await connect(process.env.DB_URL)
            await Task.create({ text, complete, username, })
            const tasks = await Task.find()
            res.json({
                message: "Created Successfully",
                tasks
            })
        } catch (error) {
            res.json({
                message: error.message
            })
        }
    }
}

const updateTask = async (req, res) =>{
    const {_id,text} = req.body
    try {
        await connect(process.env.DB_URL)
        const updatedTask = await Task.findOneAndUpdate(
            { _id }, // Assuming the category ID is stored as "_id" in the database
            { $set: { text:text } },
            { new: true } // Return the updated document
        );     
           console.log(updatedTask)
        if (updatedTask){
            res.json({
                message: "Task updated successfully "
            })
        }
        else {
            res.json({
               message: "Successfully updated",
               task: updatedTask
            })
        }
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

const deleteTask = async (req, res) => {
    const { _id } = req.body;

    if (!_id) {
        res.status(400).json({
            message: "Task not found"
        })  
    }

    else {
        try {
            await connect(process.env.DB_URL)
            await Task.deleteOne({ _id })
            const tasks = await Task.find()

            res.json({
                message: "Task Deleted Successfully",
                tasks
            })

        }

        catch (error) {
            res.json({
                message: error.message
            })
        }
    }
}
const tasksByUsername = async (req, res) =>{
    const {username} = req.params
    try {
        await connect(process.env.DB_URL)
        const isTask = await Task.find({username})
        if (!isTask){
            res.json({
                message: "No Task available"
            })
        }
        else {
            res.json({
                task: isTask
            })
        }
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}


const completeTask = async (req, res) =>{
    const {_id,complete} = req.body
    try {
        await connect(process.env.DB_URL)
        const updatedTask = await Task.findOneAndUpdate(
            { _id }, // Assuming the category ID is stored as "_id" in the database
            { $set: { complete: complete } },
            { new: true } // Return the updated document
        );     
           console.log(updatedTask)
        if (updatedTask){
            res.json({
                message: "Task updated successfully "
            })
        }
        else {
            res.json({
               message: "Successfully updated",
               task: updatedTask
            })
        }
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

module.exports = { creaeTask, updateTask, deleteTask, completeTask, tasksByUsername }