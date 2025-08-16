import {useState, useEffect} from "react"
import {LuUpload} from "react-icons/lu"
import "../modal/modal.css"
import {Dropdown} from "primereact/dropdown"
import AttachmentModal from "./AttachmentModal"
import ViewFileModal from "./ViewFileModal"
import {useFormik} from "formik"
import {
  getAPI,
  postAPI,
  getURL,
  postURL,
  uploadFile,
} from "../../service/ApiService"

const AddEmployeeModal = ({isOpen, onClose}) => {
  if (!isOpen) return null

  const [isAttchModalOpen, setAttchModalOpen] = useState(false)
  const [uploadType, setUploadType] = useState("")
  const [selectedFiles, setSelectedFiles] = useState([])
  const [isViewFileModal, setIsViewFileModal] = useState(false)
  const [viewType, setViewType] = useState("")
  const [viewFiles, setViewFiles] = useState([])
  const [roleData, setRoleData] = useState([])

  const formik = useFormik({
    initialValues: {
      action: "",
      id: null,
      firstName: "",
      lastName: "",
      mobile: "",
      salary: "",
      city: null,
      state: null,
      role: null,
    },

    onSubmit: async (data) => {
      let FileId = []
      //console.log(data)
      const jsonbody = {
        empId: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        mobile: data.mobile,
        salary: data.salary,
        city: data.city ? data.city.name : null,
        state: data.state ? data.state.name : null,
        role: data.role,
        fileAttachmentId: FileId,
      }

      console.log("jsonbody 1", jsonbody)
      if (data.action === "submit") {
        try {
          if (selectedFiles && selectedFiles.length > 0) {
            //console.log("selectedFile", selectedFiles)
            jsonbody.fileAttachmentId = await onUploadFileID(selectedFiles)
          }
          console.log("jsonbody2", jsonbody)
          const response = await postAPI(postURL.insertUpdateEmployee, jsonbody)
          // For example: await addEmployee(jsonbody);
          onClose()
        } catch (error) {}
      }
    },
  })

  const cities = [
    {name: "Midnapopre", code: "MDN"},
    {name: "Kolkata", code: "KOL"},
  ]
  const states = [
    {name: "West Bengal", code: "WB"},
    {name: "Odisha", code: "OD"},
  ]

  useEffect(() => {
    getRoles()
  }, [])

  const handleFileUpload = async (files, type) => {
    //console.log("emp page file, type", files, type)
    if (type === "emp") {
      const updatedFiles = [...selectedFiles, ...files]
      setSelectedFiles(updatedFiles)
    }
    closeAttachmentModal()
  }

  const closeAttachmentModal = () => {
    setAttchModalOpen(false)
  }

  const closeViewModal = () => {
    setIsViewFileModal(false)
  }

  const deleteFile = async (fileToDelete, type) => {
    if (fileToDelete.name && type === "emp") {
      handleDelete(selectedFiles, fileToDelete.name, setSelectedFiles)
    } else {
      alert("Error deleting file. Please try again.")
    }
  }

  const handleDelete = (files, fileNameToRemove, setFiles) => {
    const afterDelete = files.filter((file) => file.name !== fileNameToRemove)
    setFiles(afterDelete)
  }

  const onUploadFileID = async (files) => {
    //console.log("sonia files", files)
    try {
      let filesID
      const formData = new FormData()
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i])
      }
      const uploadResponse = await uploadFile(postURL.fileUpload, formData)
      //console.log("uploaaaadResponse", uploadResponse)
      if (uploadResponse.statusMessage === "Successful") {
        filesID = uploadResponse.files.map((item) => ({
          ID: item.insertedItemID,
        }))
        return filesID
      }
    } catch (error) {
      console.error("Error uploading files", error.message)
    }
    return []
  }
  const getRoles = async () => {
    try {
      const rolesdata = await getAPI(getURL.getRolesDropdown)
      console.log("rolesdata", rolesdata.rowsEffected)
      setRoleData(rolesdata.rowsEffected)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 text-black">
      <div
        className="flex flex-col bg-white shadow-lg/30 px-4 py-5 max-w-lg w-full"
        style={{minWidth: "49rem"}}
      >
        <p className="text-lg font-bold mb-0 pb-0">Add Employee</p>
        <hr className="border-t-3 mb-4" style={{color: "#569cb4"}} />
        <div className="flex flex-col gap-0">
          <form autoComplete="off" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-5">
              <div className="flex justify-between">
                <label
                  htmlFor="firstName"
                  className="text-gray-600 text-sm font-bold"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="underlined_input"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              <div className="flex justify-between">
                <label
                  htmlFor="lastName"
                  className="text-gray-600 text-sm font-bold"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="underlined_input"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              <div className="flex justify-between">
                <label
                  htmlFor="mobile"
                  className="text-gray-600 text-sm font-bold"
                >
                  Mobile
                </label>
                <input
                  id="mobile"
                  name="mobile"
                  type="number"
                  className="underlined_input"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              <div className="flex justify-between">
                <label
                  htmlFor="salary"
                  className="text-gray-600 text-sm font-bold"
                >
                  Salary
                </label>
                <input
                  id="salary"
                  name="salary"
                  type="number"
                  className="underlined_input"
                  value={formik.values.salary}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              <div className="flex justify-between items-end">
                <label
                  htmlFor="city"
                  className="text-gray-600 text-sm font-bold"
                >
                  City
                </label>
                <Dropdown
                  id="city"
                  value={formik.values.city}
                  onChange={(e) => {
                    formik.setFieldValue("city", e.value)
                  }}
                  onBlur={() => formik.setFieldTouched("city", true)}
                  options={cities}
                  optionLabel="name"
                  className="emp-dropdown"
                  placeholder="Select City"
                />
              </div>

              <div className="flex justify-between items-end">
                <label
                  htmlFor="state"
                  className="text-gray-600 text-sm font-bold"
                >
                  State
                </label>
                <Dropdown
                  id="state"
                  value={formik.values.state}
                  onChange={(e) => {
                    formik.setFieldValue("state", e.value)
                  }}
                  onBlur={() => formik.setFieldTouched("state", true)}
                  options={states}
                  optionLabel="name"
                  className="emp-dropdown"
                  placeholder="Select State"
                />
              </div>

              <div className="flex justify-between items-end">
                <label
                  htmlFor="role"
                  className="text-gray-600 text-sm font-bold"
                >
                  Role
                </label>
                <Dropdown
                  id="role"
                  value={formik.values.role}
                  onChange={(e) => {
                    formik.setFieldValue("role", e.value)
                  }}
                  onBlur={() => formik.setFieldTouched("role", true)}
                  options={roleData}
                  optionLabel="RoleName"
                  optionValue="Id"
                  className="emp-dropdown"
                  placeholder="Select Role"
                />
              </div>

              <div className="flex justify-between my-3">
                <label
                  htmlFor="name"
                  className="text-gray-600 text-sm font-bold"
                >
                  Upload Files
                </label>
                <div className="flex justify-start gap-4 emp-upload">
                  <span className="file_upload_icon">
                    <LuUpload
                      className="file-upload-icon "
                      onClick={() => {
                        setAttchModalOpen(true)
                        setUploadType("emp")
                        setViewType("reviewer")
                      }}
                    />
                  </span>
                  {selectedFiles.length !== 0 ? (
                    <span
                      className="attachment"
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsViewFileModal(true)
                        setUploadType("emp")
                        setViewFiles(selectedFiles)
                      }}
                    >
                      Attachment(s)
                    </span>
                  ) : (
                    <>
                      <span className="no-record-found text-xs text-gray-900">
                        No Attachment(s) Found.
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <button
                type="submit"
                className="btn-upload cursor-pointer"
                onClick={() => {
                  formik.setFieldValue("action", "submit")
                }}
              >
                Add
              </button>
              <button
                type="button"
                className="btn-cancel cursor-pointer"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <AttachmentModal
        isOpen={isAttchModalOpen}
        onClose={closeAttachmentModal}
        handleFileUpload={handleFileUpload}
        type={uploadType}
      />
      <ViewFileModal
        isOpen={isViewFileModal}
        onClose={closeViewModal}
        type={uploadType}
        accessType={viewType}
        viewFiles={viewFiles}
        deleteFile={deleteFile}
      />
    </div>
  )
}

export default AddEmployeeModal
