const {model, Schema} = require("mongoose")

const user_module = new Schema({
    username:{
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    full_name: {
        type: String,
        required: true,
    },
    
    password: {
        type: String, 
        required: true,
    },
    
    role: {
        type: String, 
        required: true,
        default: "user"
    },
    dp: {
        type: String, 
    },
    joining: {
        type: String, 
        default: Date.now
    },
})

const User = model("user", user_module)
module.exports = User