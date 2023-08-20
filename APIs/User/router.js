const express = require("express")
const router = express.Router()
const {signup, singin} = require("./controler")

router.post("/register", signup)

router.post("/login", singin)

module.exports = router