const dotenv = require("dotenv")
dotenv.config()

module.exports = {
  PORT,
  DATABASENAME,
  DBHOSTNAME,
  DBPORT,
  DBUSERNAME,
  DBPASSWORD,
} = process.env
