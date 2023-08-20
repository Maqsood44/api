const express = require("express")
const app = express()
require("dotenv").config()
const port = process.env.PORT || 3000
const cors = require("cors")
const path = require("path")

const clientSidpath = path.join(__dirname, "./client/dist")
app.use(("/", express.static(clientSidpath)))

app.use(express.json())
app.use(cors())

app.use("/api", require("./APIs/User/router"))
app.use("/api", require("./APIs/Tasks/router"))


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/dist/index.html"))
})


app.listen(port, () => {
    console.log(`Server run on port ${port}`)
})