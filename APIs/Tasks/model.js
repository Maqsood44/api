const {model, Schema} = require("mongoose")

const task = new Schema({
    text: {
        type: String,
        required: true,
    },
    complete:{
        type: Boolean,
        default: false
    },
    username:{
        type: String,
        requited: true,
    },
    created:{
        type: String,
        default: Date.now
    }
})

const Task = model("task", task)
module.exports = Task