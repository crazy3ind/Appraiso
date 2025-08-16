import {LuUpload} from "react-icons/lu"
import "../modal/modal.css"
import {useState} from "react"

const AttachmentModal = ({
  isOpen,
  onClose,
  selectedFiles = [],
  handleFileUpload,
  type,
}) => {
  //console.log("type", type)
  if (!isOpen) return null

  const [selectedFileName, setSelectedFileName] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)
  const [invalidFileText, setInvalidFileText] = useState("")

  const handleFileChange = (e) => {
    try {
      e.preventDefault()
      const files = e.target.files
      //console.log("uploaded files", files)
      let invalidFileFound = false
      let selectedFileName = ""
      setSelectedFile(null)
      setSelectedFileName("")
      setInvalidFileText("")
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > 5 * 1024 * 1024) {
          invalidFileFound = true
          setInvalidFileText("File size should not be more than 5 MB !")
          break
        }
        if (!invalidFileFound) {
          setSelectedFile(files)
          if (files.length > 1) {
            selectedFileName = `${files.length} files selected`
          } else {
            selectedFileName = files[0].name
          }
          setSelectedFileName(selectedFileName)
        }
      }
    } catch (error) {}
  }

  const handleUpload = (e) => {
    e.preventDefault()
    if (selectedFile) {
      handleFileUpload(selectedFile, type)
    } else {
      setInvalidFileText("Please select a file to upload.")
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 text-black">
      <div
        className="flex flex-col bg-white shadow-lg/30 px-6 py-8 max-w-lg w-full"
        style={{minWidth: "30rem"}}
      >
        <p className="text-lg font-bold mb-0 pb-0">Upload Document</p>
        <hr className="border-t-3" style={{color: "#569cb4"}} />

        <div className="flex justify-between m-6">
          <div className="flex justify-center emp-upload">
            <span
              onClick={() => {
                document.getElementById("fileInserted").click()
              }}
              className="flex items-center no-record-found text-xs text-gray-900 cursor-pointer outline-1 outline-black outline-dashed p-12"
            >
              <span className="mr-4">
                <i
                  className="pi pi-cloud-upload"
                  style={{fontSize: "2.5rem", color: "#569cb4"}}
                />
                <input
                  id="fileInserted"
                  type="file"
                  multiple
                  accept=".xlsx, .xls, .doc, .docx, .pdf, .jpg"
                  style={{display: "none"}}
                  onClick={(e) => (e.target.value = null)} //reset_file_input_on_click
                  onChange={handleFileChange}
                />
              </span>
              <p>Click here to upload (max 5 mb)</p>
            </span>
            {invalidFileText && <label>{invalidFileText}</label>}

            <label>
              {selectedFileName ? `${"Filename: "}${selectedFileName}` : ""}
            </label>
          </div>
        </div>
        <div className="flex justify-between">
          <button className="btn-cancel cursor-pointer" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn-upload cursor-pointer"
            onClick={(e) => handleUpload(e)}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  )
}

export default AttachmentModal
