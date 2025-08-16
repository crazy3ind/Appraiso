const {
  DBHOSTNAME,
  DATABASENAME,
  DBUSERNAME,
  DBPASSWORD,
  DBPORT,
} = require("../config/index.js")
const sql = require("mssql")
const config = {
  server: DBHOSTNAME,
  port: parseInt(DBPORT),
  database: DATABASENAME,
  user: DBUSERNAME,
  password: DBPASSWORD,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
}

const pool = new sql.ConnectionPool(config)
const poolConnect = pool
  .connect()
  .then((pool) => {
    console.log("Connected to MSSQL Database")
    return pool
  })
  .catch((err) => console.log("Database connection failed:", err))

module.exports = {
  pool,
  poolConnect,
}
