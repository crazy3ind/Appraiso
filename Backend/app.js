const express = require("express")
const dotenv = require("dotenv")
const db = require("./database/dbConnection.js")
dotenv.config()

const app = express()
const PORT = process.env.PORT
const cors = require("cors")
app.use(cors())
app.use(express.json())
const routes = require("./routes/userRoute.js")
app.use(routes)
app.get("/", (req, res) => {
  res.send("Welcome to the User Management API")
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
