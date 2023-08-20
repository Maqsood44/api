const {connect} = require('mongoose')
require('dotenv').config()
const User = require('./model')
const {hash , compare} = require("bcryptjs")
const JWT = require("jsonwebtoken")

const signup = async (req, res) => {
    // data from request body
    const {username, email, fname, lname, password, address } = req.body;

    if ( !username || !email || !fname || !password || !address) {
        res.status(401).json({
            message: "required field is empty"
        })
    }
    else {
        try {
            // connect database
            await connect(process.env.DB_URL, {  useNewUrlParser: true, useUnifiedTopology: true})
            // chek for the existance of email in database.
            if ( await User.exists({ email })) {
                res.status(401).json({
                    message: "Username or Email already exist"
                })
            }
            else {
                await User.create({  email, fname, lname, password: await hash(password, 12),   address })
                res.status(200).json({
                    message: "Successfully Registerd"
                })
            }
        }

        catch (error) {
            res.json({
                message: error.message
            })
        }
    }
}


const singin = async (req, res) => {
    const { email, password } = req.body;
    if ((!email || !password)) {
        res.json({
            message: "Input field empty"
        })
    }
    else {
        try {
            // connect database
            await connect(process.env.DB_URL, {  useNewUrlParser: true, useUnifiedTopology: true})

            // If @ include in input field then its email otherwise its Username
            // find user through email or username in database
            const findUser = await User.findOne({ email: email })
            if (!findUser) {
                res.json({
                    message: "User does not found"
                })
            }
            else {
                // chack for password
                const decryptPwd = await compare(password, findUser.password)
                if ( email == findUser.email && decryptPwd) {
                    // generate a JWT token for user to identify the authenticate user
                    const token = JWT.sign({
                        id: findUser._id,
                        email: findUser.email,
                        dp: findUser.dp,
                        email: findUser.role
                    },process.env.JWT_KEY)
                    res.json({
                        user: findUser,
                        token: token
                    })
                }
            }
        } catch (error) {
            res.json({
                message: error.message
            })
        }

    }
}

module.exports = {signup, singin}