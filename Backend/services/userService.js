const db = require("../database/dbConnection")
const sql = require("mssql")
const nodemailer = require("nodemailer")
const {generateToken} = require("../global/GlobalToken")

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "sonia2khatun4@gmail.com",
    pass: "qggfkiszxltqbcwu",
    /* user: "bibekmahata112@gmail.com",
    pass: "vxxjmjvlxxixexap", */
  },
})

const userService = {
  getAllUsers: async (req, res, next) => {
    try {
      await db.poolConnect
      const request = db.pool.request()
      request.output("StatusID", sql.Int)
      request.output("StatusMessage", sql.NVarChar(255))
      const result = await request.execute("[dbo].[SpGetAllUsers]")
      const StatusID = result.output.StatusID
      const StatusMessage = result.output.StatusMessage
      const response = {
        status: true,
        StatusID: StatusID,
        message: StatusMessage,
        rowsEffected: result.recordsets[0],
      }
      res.json(response)
    } catch (error) {
      console.error("SQL Error", error)
      return next(error)
    }
  },

  getRoleDropdown: async (req, res, next) => {
    try {
      await db.poolConnect
      const request = db.pool.request()
      request.output("StatusID", sql.Int)
      request.output("StatusMessage", sql.NVarChar(255))
      const result = await request.execute("[dbo].[SpGetRoleDropdown]")
      const StatusID = result.output.StatusID
      const StatusMessage = result.output.StatusMessage
      const response = {
        status: true,
        StatusID: StatusID,
        message: StatusMessage,
        rowsEffected: result.recordsets[0],
        rowsEffected1: result.recordsets[1],
      }
      res.json(response)
    } catch (error) {
      console.error("SQL Error", error)
      return next(error)
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const UserID = req.body.UserId
      await db.poolConnect
      const request = db.pool.request()
      request.input("UserID", sql.Int, UserID)
      request.output("StatusID", sql.Int)
      request.output("StatusMessage", sql.NVarChar(255))
      const result = await request.execute("[dbo].[spDeleteUser]")
      // console.log(result.recordsets[0]);
      const StatusID = result.output.StatusID
      const StatusMessage = result.output.StatusMessage
      const response = {
        status: true,
        StatusID: StatusID,
        message: StatusMessage,
        rowsEffected: result.recordsets[0],
      }
      res.json(response)
    } catch (error) {
      console.log("SQL error ", error)
      return next(error)
    }
  },
  insertUpdateUser: async (req, res, next) => {
    try {
      const jsonData = JSON.stringify(req.body)
      await db.poolConnect
      const request = db.pool.request()
      request.input("JSONDATA", sql.NVarChar(sql.MAX), jsonData)
      request.output("StatusID", sql.Int)
      request.output("StatusMessage", sql.NVarChar(255))
      request.output("Getmail", sql.NVarChar(255))
      const result = await request.execute("[dbo].[SpInsertUpdateUser]")
      // console.log(result.recordsets[0]);
      const StatusID = result.output.StatusID
      const StatusMessage = result.output.StatusMessage
      const Usermail = result.output.Getmail

      const response = {
        status: true,
        StatusID: StatusID,
        message: StatusMessage,
      }
      res.json(response)
      const mailOptions = {
        from: "sonia2khatun4@gmail.com",
        to: req.body.userEmail,
        subject: "For Your Subscription Verification",
        text: `Your Login URL is ${process.env.UI_URL} and your mail id is ${Usermail}`,
      }
      try {
        await transporter.sendMail(mailOptions)
        console.log("Email sent successfully")
      } catch (error) {
        console.error("Error sending email:", error)
      }
    } catch (error) {
      console.log("SQL error ", error)
      return next(error)
    }
  },

  UserLogin: async (req, res, next) => {
    try {
      const UserEmail = req.body.UserEmail
      await db.poolConnect
      const request = db.pool.request()
      request.input("UserEmail", sql.NVarChar(100), UserEmail)
      request.output("StatusID", sql.Int)
      request.output("StatusMessage", sql.NVarChar(255))
      const result = await request.execute("[dbo].[SpGetUserByEmail]")
      //console.log("result", result.recordsets[0])
      const userdata = result.recordsets[0][0]
      //console.log("userdata", userdata)
      if (!userdata) {
        return res.json({
          status: false,
          message: "account not found!",
        })
      }
      const StatusID = result.output.StatusID
      const StatusMessage = result.output.StatusMessage
      const AccessToken = generateToken({
        userEmail: UserEmail,
      })
      const response = {
        status: true,
        StatusID: StatusID,
        message: StatusMessage,
        rowsEffected: result.recordsets[0],
        token: AccessToken,
      }
      res.json(response)
    } catch (error) {
      console.log("SQL error ", error)
      return next(error)
    }
  },

  insertUpdateEmployee: async (req, res, next) => {
    try {
      await db.poolConnect
      const request = db.pool.request()
      const JSONDATA = req.body
      request.input(
        "JSON_DATA",
        sql.NVarChar(sql.MAX),
        JSON.stringify(JSONDATA)
      )
      request.output("LastInsertedId", sql.Int)
      request.output("StatusID", sql.Int)
      request.output("StatusMessage", sql.NVarChar(200))
      const result = await request.execute("[dbo].[spInsertEmployeeDetails]")

      const StatusID = result.output.StatusID
      const StatusMessage = result.output.StatusMessage
      const LastInsertedId = result.output.LastInsertedId

      if (StatusID === 1) {
        const response = {
          status: true,
          StatusID: StatusID,
          message: StatusMessage,
          LastInsertedId,
        }
        res.json(response)
      } else {
        const response = {
          status: false,
          StatusID: StatusID,
          message: StatusMessage,
        }
        res.json(response)
      }
      //console.log("JSONDATA", JSONDATA)
    } catch (error) {
      console.log("Comes from Backned", error)
      res.status(500).json({success: false, message: "Internal server error"})
    }
  },
  getAllStudents: async (req, res, next) => {
    try {
      await db.poolConnect
      const request = db.pool.request()
      request.output("StatusID", sql.Int)
      request.output("StatusMessage", sql.NVarChar(255))
      const result = await request.execute("[dbo].[spGetAllStudent]")
      const StatusID = result.output.StatusID
      const StatusMessage = result.output.StatusMessage
      const response = {
        status: true,
        StatusID: StatusID,
        message: StatusMessage,
        rowsEffected: result.recordsets[0],
      }
      res.json(response)
    } catch (error) {
      console.error("SQL Error", error)
      return next(error)
    }
  },
  filterStudents: async (req, res, next) => {
    try {
      const {StudentName = "", Email = "", ContactNo = ""} = req.body

      await db.poolConnect
      const request = db.pool.request()

      request.input("StudentName", sql.NVarChar(200), StudentName)
      request.input("Email", sql.NVarChar(150), Email)
      request.input("ContactNo", sql.NVarChar(20), ContactNo)
      request.output("StatusID", sql.Int)
      request.output("StatusMessage", sql.NVarChar(255))

      const result = await request.execute("[dbo].[FilterStudents]")

      const StatusID = result.output.StatusID
      const StatusMessage = result.output.StatusMessage

      const response = {
        status: true,
        StatusID: StatusID,
        message: StatusMessage,
        rowsEffected: result.recordset || [],
      }

      res.json(response)
    } catch (error) {
      console.error("SQL Error in filterStudents:", error)
      return next(error)
    }
  },
}

module.exports = userService
