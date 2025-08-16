import "../../styles/Login.css"
import signupBg from "../../assets/image/login-signup-background.jpg"
import { useFormik } from "formik"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { useNavigate } from "react-router-dom"
import { FloatLabel } from "primereact/floatlabel"
import { InputTextarea } from "primereact/inputtextarea"
import { Dropdown } from "primereact/dropdown"
import { getAPI, getURL, postAPI, postURL } from "../../service/ApiService"
import { useEffect, useRef, useState } from "react"
import { Toast } from "primereact/toast"

function Signup() {
  //varriable
  const navigate = useNavigate()
  const toast = useRef(null)

  //hooks
  const [roleData, setRoleData] = useState([])
  //console.log(roleData)

  useEffect(() => {
    getRoles()
  }, [])

  //functions
  // validation function
  const validate = (values) => {
    const errors = {}

    // Name validation
    if (!values.name) {
      errors.name = "Name is required"
    } else if (values.name.length < 2) {
      errors.name = "Name is too short!"
    } else if (values.name.length > 50) {
      errors.name = "Name is too long!"
    }

    // Role validation
    if (!values.role) {
      errors.role = "Role is required"
    } else if (values.role === "") {
      // Ensure "Select Role" isn't chosen
      errors.role = "Role is required"
    }

    // Contact validation
    const contactRegex = /^[6-9][0-9]{9}$/
    if (!values.contact) {
      errors.contact = "Contact number is required"
    } else if (!contactRegex.test(values.contact)) {
      errors.contact =
        "Contact number must be 10 digits and start with 6, 7, 8, or 9."
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Standard email regex
    if (!values.email) {
      errors.email = "Email is required"
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email address"
    } else if (!values.email.endsWith(".com")) {
      // Custom check for .com
      errors.email = "Email address must end with '.com'"
    }

    // Address validation
    if (!values.address) {
      errors.address = "Address is required"
    } else if (values.address.length < 5) {
      errors.address = "Address is too short!"
    } else if (values.address.length > 200) {
      errors.address = "Address is too long!"
    }

    return errors
  }
  // ---

  const formik = useFormik({
    initialValues: {
      action: "",
      id: null,
      name: "",
      role: "",
      contact: "",
      email: "",
      address: "",
    },
    validate: validate,
    onSubmit: async (values, { resetForm }) => {
      const jsonbody = {
        id: values.id,
        name: values.name,
        role: values.role,
        contactNumber: values.contact,
        userEmail: values.email,
        address: values.address,
      }

      try {
        const response = await postAPI(postURL.signUp, jsonbody)
        console.log("", response)
        if (response.message === "User inserted successfully")
          toast.current.show({
            severity: "success",
            detail: "Registration Successfull",
          })
      } catch (error) { }
      resetForm()
    },
  })

  const handleContactChange = (e) => {
    const value = e.target.value
    const filteredValue = value.replace(/[^0-9]/g, "")
    formik.setFieldValue("contact", filteredValue)
  }

  const getRoles = async () => {
    try {
      const rolesdata = await getAPI(getURL.getRolesDropdown)
      //console.log("rolesdata", rolesdata.rowsEffected)
      setRoleData(rolesdata.rowsEffected)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="background-image-container">
      <img
        src={signupBg}
        className="w-full h-full object-fill"
        alt="Signup Background"
      />

      <div className="absolute inset-0 flex items-center justify-center w-screen z-10 ">
        <div className="bg-gray-50 shadow-xl/20 p-6 sm:p-8 rounded-lg shadow-2xl flex flex-col items-center w-full max-w-sm md:max-w-md max-h-screen">
          <p className="text-black text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-center mb-6">
            Sign Up
          </p>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col items-center w-full"
            autoComplete="off"
          >
            <div className="flex flex-col gap-6 p-0 m-0 w-full">
              <FloatLabel className="flex-1">
                <label htmlFor="name" className="text-black">
                  Name
                </label>
                <InputText
                  id="name"
                  name="name"
                  type="text"
                  value={formik.values.name}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[0-9]/g, "") //prevent numbers
                    formik.setFieldValue("name", value)
                  }}
                  onBlur={formik.handleBlur}
                  className={`p-inputtext-sm w-full ${formik.touched.name && formik.errors.name ? "p-invalid" : ""
                    }`}
                />
                {formik.touched.name && formik.errors.name && (
                  <small className="p-error">{formik.errors.name}</small>
                )}
              </FloatLabel>

              <FloatLabel className="flex-1">
                <label htmlFor="role" className="text-black">
                  Role
                </label>
                <Dropdown
                  filter
                  id="role"
                  name="role"
                  value={formik.values.role}
                  onChange={(e) => {
                    formik.setFieldValue("role", e.value)
                  }}
                  onBlur={() => formik.setFieldTouched("role", true)}
                  className={`p-inputtext-sm w-full ${formik.touched.role && formik.errors.role ? "p-invalid" : ""
                    }`}
                  options={roleData}
                  optionLabel="RoleName"
                  optionValue="Id"
                  optionDisabled={(option) => option.code === ""}
                  placeholder="Role"
                />

                {formik.touched.role && formik.errors.role && (
                  <small className="p-error">{formik.errors.role}</small>
                )}
              </FloatLabel>

              <FloatLabel className="flex-1">
                <label htmlFor="contact" className="text-black">
                  Contact No.
                </label>
                <InputText
                  id="contact"
                  name="contact"
                  value={formik.values.contact}
                  onChange={handleContactChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  className={`p-inputtext-sm w-full ${formik.touched.contact && formik.errors.contact
                    ? "p-invalid"
                    : ""
                    }`}
                />
                {formik.touched.contact && formik.errors.contact && (
                  <small className="p-error">{formik.errors.contact}</small>
                )}
              </FloatLabel>

              <FloatLabel className="flex-1">
                <label htmlFor="email" className="text-black">
                  Email
                </label>
                <InputText
                  id="email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`p-inputtext-sm w-full ${formik.touched.email && formik.errors.email
                    ? "p-invalid"
                    : ""
                    }`}
                />
                {formik.touched.email && formik.errors.email && (
                  <small className="p-error">{formik.errors.email}</small>
                )}
              </FloatLabel>

              <FloatLabel className="flex-1">
                <label htmlFor="address" className="text-black">
                  Address
                </label>
                <InputTextarea
                  id="address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  rows={2}
                  cols={30}
                  className={`w-full ${formik.touched.address && formik.errors.address
                    ? "p-invalid"
                    : ""
                    }`}
                />
                {formik.touched.address && formik.errors.address && (
                  <small className="p-error">{formik.errors.address}</small>
                )}
              </FloatLabel>
            </div>

            <div className="flex flex-col w-full sm:w-1/2 mt-4">
              <Button
                label="Sign Up"
                type="submit"
                className="p-button-primary w-full"
                severity="secondary"
                disabled={!formik.isValid || formik.isSubmitting}
              />
            </div>
          </form>

          <p className="text-black text-center mt-4">
            Already have an account?{" "}
            <span
              className="italic text-gray-600 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
      <Toast ref={toast} position="top-right" />
    </div>
  )
}

export default Signup
