import { Routes, Route, Navigate } from "react-router-dom"
import Login from "../../components/pages/Login"
import Signup from "../../components/pages/Signup"
import Dashboard from "../../components/pages/Dashboard"
import ProtectedRoute from "./ProtectedRoute"
import ManageEmployee from "../../components/pages/ManageEmployee"
import DefaultLayout from "../layout/DefaultLayout"

function Index() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route
        path="dashboard"
        element={
          <ProtectedRoute
            element={
              <DefaultLayout>
                <Dashboard />
              </DefaultLayout>
            }
          />
        }
      />
      <Route
        path="employee"
        element={
          <ProtectedRoute
            element={
              <DefaultLayout>
                <ManageEmployee />
              </DefaultLayout>
            }
          />
        }
      />
    </Routes>
  )
}

export default Index
