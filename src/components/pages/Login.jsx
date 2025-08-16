import "../../styles/Login.css"
import signupBg from "../../assets/image/login-signup-background.jpg"
import { useFormik } from "formik"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { useNavigate } from "react-router-dom"
import { FloatLabel } from "primereact/floatlabel"
import { postAPI, postURL } from "../../service/ApiService"
import { Toast } from "primereact/toast"
import { useRef } from "react"

function Login() {
  const navigate = useNavigate()
  const toast = useRef(null)

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values, { resetForm }) => {
      if (!formik.values.email) {
        toast.current.show({
          severity: "error",
          detail: "please enter a valid email!",
        })
      } else {
        const jsonbody = {
          UserEmail: values.email,
        }

        try {
          const response = await postAPI(postURL.login, jsonbody)
          console.log("", response)
          if (response.message === "Login Successful") {
            toast.current.show({
              severity: "success",
              detail: response.message,
              life: 2000,
            })
            sessionStorage.setItem("accesstoken", response.token)
            sessionStorage.setItem(
              "userDetails",
              JSON.stringify(response.rowsEffected[0])
            )
            sessionStorage.setItem("userName", response.rowsEffected[0].Name)
            setTimeout(() => {
              navigate("/dashboard")
            }, 2000)
          } else {
            toast.current.show({
              severity: "error",
              detail: response.message,
            })
          }
        } catch (error) {
          console.log(error)
        }
      }
      resetForm()
    },
  })

  return (
    <div className="background-image-container">
      <img src={signupBg} />
      <div className="absolute inset-0 flex flex-col items-center w-screen justify-center z-10 gap-8">
        <div className="bg-gray-50 p-8 rounded-lg shadow-xl/20 flex flex-col items-center w-full max-w-md">
          <p className="text-black text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-center mb-6">
            Login
          </p>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-2 w-full"
          >
            <div className="p-field flex flex-col">
              <FloatLabel>
                <label htmlFor="email" className="text-black mb-1">
                  Email
                </label>
                <InputText
                  id="email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className="p-inputtext-sm w-full"
                />
              </FloatLabel>
            </div>
            <Button
              label="Login"
              type="submit"
              className="p-button-primary mt-4 w-full"
              severity="secondary"
            />
          </form>
          <p className="text-black mt-4">
            Don't have an account?{" "}
            <span
              className="italic text-gray-600 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
      <Toast ref={toast} position="top-right" />
    </div>
  )
}

export default Login

/* const API_BASE_URL = 'http://your-api-base-url';

const EmployeeService = {
  // Get all employees
  getAllEmployees: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/employees`);
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }
  },

  // Get single employee by ID
  getEmployeeById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch employee');
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching employee ${id}:`, error);
      throw error;
    }
  },

  // Create new employee
  createEmployee: async (employeeData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/employees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });
      if (!response.ok) {
        throw new Error('Failed to create employee');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating employee:', error);
      throw error;
    }
  },

  // Update existing employee
  updateEmployee: async (id, employeeData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });
      if (!response.ok) {
        throw new Error('Failed to update employee');
      }
      return await response.json();
    } catch (error) {
      console.error(`Error updating employee ${id}:`, error);
      throw error;
    }
  },

  // Delete employee
  deleteEmployee: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete employee');
      }
      return true;
    } catch (error) {
      console.error(`Error deleting employee ${id}:`, error);
      throw error;
    }
  },

  // Import employees from file
  importEmployees: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API_BASE_URL}/employees/import`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to import employees');
      }
      return await response.json();
    } catch (error) {
      console.error('Error importing employees:', error);
      throw error;
    }
  }
};

export default EmployeeService;
 */
