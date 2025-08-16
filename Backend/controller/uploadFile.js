require("dotenv").config() // Load environment variables from .env file

const multer = require("multer")
const path = require("path")
const db = require("../database/dbConnection")
const sql = require("mssql")
const fs = require("fs")

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    const rootPath = process.env.UPLOADS
    // const parameterType = req.body.Workflow_TypeId; // Assuming 'parameterType' is the name of the parameter

    // let folder = getFolderName(parameterType)
    let folder = "test"

    // Set the destination path
    const destinationPath = path.join(rootPath, folder)

    // Check if folder exists
    if (!fs.existsSync(destinationPath)) {
      // If folder doesn't exist, create it
      console.log("path ", destinationPath)
      fs.mkdirSync(destinationPath)
    }

    cb(null, destinationPath)
  },
  filename: (req, file, cb) => {
    const originalname = file.originalname
    const filenameWithoutExtension = originalname.substring(
      0,
      originalname.lastIndexOf(".")
    )
    const extension = path.extname(originalname)
    const timestamp = getFormattedTimestamp()
    const newFilename = `${filenameWithoutExtension}_${timestamp}${extension}`
    cb(null, newFilename)
  },
})

const upload = multer({
  storage: storageConfig,
})

function getFormattedTimestamp() {
  const now = new Date()
  const day = String(now.getDate()).padStart(2, "0")
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const year = String(now.getFullYear()).slice(-2)
  const hours = String(now.getHours()).padStart(2, "0")
  const minutes = String(now.getMinutes()).padStart(2, "0")
  const seconds = String(now.getSeconds()).padStart(2, "0")

  return `${day}${month}${year}${hours}${minutes}${seconds}`
}

const uploadFile = async (req, res) => {
  try {
    upload.array("files", 5)(req, res, async (err) => {
      if (err) {
        console.error("File upload error", err)
        return res.status(500).json({
          success: false,
          message: "File Upload Error",
          error: err.message,
        })
      }
      // console.log('log after upload res',res);
      const rootPath = process.env.UPLOADS
      const parameterType = req.body.Workflow_TypeId
      //   let folder = getFolderName(parameterType)
      let folder = "test"

      const destinationPath = path.join(rootPath, folder)
      const fileData = req.files.map((file) => {
        // const protocol = req.protocol || 'http'; // 'https'; // Default to http if protocol is undefined
        const protocol = process.env.PROTOCOL // 'https'; // Default to http if protocol is undefined
        const host = req.get("host") || "localhost:3009" // Default to localhost:3009 if host is undefined
        // const baseurl = process.env.BASEURL;
        const filenameEncoded = encodeURIComponent(file.filename) // Encode the file name
        const downloadURL = `${protocol}://${host}/api/download/${folder}/${filenameEncoded}`
        // const downloadURL = `${baseurl}/api/download/${folder}/${filenameEncoded}`;
        return {
          File_URL: path.join(destinationPath, file.filename),
          File_Name: file.filename,
          Created_By: "",
          Download_URL: downloadURL, // Include download URL in file data
          //Attachment_Version: req.body.Attachment_Version,
          //Item_Id: req.body.Item_Id,
          //   Attatchment_Mapping_Id: req.body.Attatchment_Mapping_Id,
        }
      })

      // Execute the stored procedure
      const request = db.pool.request()

      // Get input parameters from the request body
      const JSON_DATA = JSON.stringify(fileData)
      // const Workflow_TypeId = req.body.Workflow_TypeId;

      // Define input parameters
      request.input("JSON_DATA", sql.NVarChar(sql.MAX), JSON_DATA)
      //   request.input("Workflow_TypeId", sql.Int, Workflow_TypeId);
      request.output("StatusID", sql.Int)
      request.output("StatusMessage", sql.VarChar(200))

      try {
        const result = await request.execute(
          "[dbo].[spInsertTblItemAttachment]"
        )
        // Get the output parameter values
        const statusID = result.output.StatusID
        const statusMessage = result.output.StatusMessage
        // Safely get the inserted IDs from the result set
        const insertedITSItemIDs = Array.isArray(result.recordset)
          ? result.recordset.map((row) => row.Id)
          : []
        console.log(
          "Database insertion result:",
          result,
          "sonia:",
          insertedITSItemIDs
        )

        return res.json({
          success: true,
          message: "Files uploaded and data inserted successfully!",
          files: req.files.map((file, index) => ({
            filename: file.filename,
            filePath: path.join(process.env.UPLOADS, file.filename),
            insertedItemID: insertedITSItemIDs[index] || null, // If no ID, set null
            downloadURL: fileData[index].Download_URL,
          })),
          statusID: statusID,
          statusMessage: statusMessage,
        })
      } catch (dbError) {
        console.error("Database error", dbError)
        return res.status(500).json({
          success: false,
          message: "Database Error",
          error: dbError.message,
        })
      }
    })
  } catch (err) {
    console.error("Internal Server Error", err)

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    })
  }
}

module.exports = uploadFile
