const userService = require("../services/userService")
const userController = {
  getAllUsers: async (req, res, next) => {
    try {
      await userService.getAllUsers(req, res, next)
    } catch (error) {
      console.error("Error in controller:", error)
      res.status(500).json({success: false, message: "Internal server error"})
      next(error)
    }
  },
  getRoleDropdown: async (req, res, next) => {
    try {
      await userService.getRoleDropdown(req, res, next)
    } catch (error) {
      console.error("Error in controller:", error)
      res.status(500).json({success: false, message: "Internal server error"})
      next(error)
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      await userService.deleteUser(req, res, next)
    } catch (error) {
      console.log(error)
      res.status(500).json({success: false, message: "Internal server error"})
      next(error)
    }
  },
  insertUpdateUser: async (req, res, next) => {
    try {
      await userService.insertUpdateUser(req, res, next)
    } catch (error) {
      console.log(error)
      res.status(500).json({success: false, message: "Internal server error"})
      next(error)
    }
  },
  UserLogin: async (req, res, next) => {
    try {
      await userService.UserLogin(req, res, next)
    } catch (error) {
      console.log(error)
      res.status(500).json({success: false, message: "Internal server error"})
      next(error)
    }
  },
  insertUpdateEmployee: async (req, res, next) => {
    try {
      await userService.insertUpdateEmployee(req, res, next)
    } catch (error) {
      console.log(error)
      res.status(500).json({success: false, message: "Internal server error"})
      next(error)
    }
  },
  getAllStudents: async (req, res, next) => {
    try {
      await userService.getAllStudents(req, res, next)
    } catch (error) {
      console.error("Error in controller:", error)
      res.status(500).json({success: false, message: "Internal server error"})
      next(error)
    }
  },
  filterStudents: async (req, res, next) => {
    try {
      await userService.filterStudents(req, res, next)
    } catch (error) {
      console.error("Error in filterStudents controller:", error)
      res.status(500).json({success: false, message: "Internal server error"})
      next(error)
    }
  },
}

module.exports = userController
