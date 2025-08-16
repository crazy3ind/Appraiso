const express = require("express")
const userRoutes = express.Router()
const userController = require("../controller/userController")
const {authenticateToken} = require("../global/GlobalToken")
const uploadFile = require("../controller/uploadFile")

userRoutes.get("/getAllUsers", userController.getAllUsers)
userRoutes.get("/getRoleDropdown", userController.getRoleDropdown)
userRoutes.get("/getAllStudents", userController.getAllStudents)
userRoutes.post("/deleteUser", userController.deleteUser)
userRoutes.post("/insertUpdateUser", userController.insertUpdateUser)
userRoutes.post("/UserLogin", userController.UserLogin)
userRoutes.post("/uploadFile", uploadFile)
userRoutes.post("/insertUpdateEmployee", userController.insertUpdateEmployee)
userRoutes.post("/filterStudents", userController.filterStudents)

module.exports = userRoutes
