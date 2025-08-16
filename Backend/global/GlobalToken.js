const {request} = require("express")
const jwt = require("jsonwebtoken")

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_TOKEN, {expiresIn: "10m"})
}

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_TOKEN)
}

function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) {
    return res.sendStatus(401) //reffers null or invalid token
  }
  try {
    req.user = verifyToken(token)
    next()
  } catch (error) {
    res.sendStatus(403) //reffers token is okay, but don't have access
  }
}

module.exports = {generateToken, verifyToken, authenticateToken}
