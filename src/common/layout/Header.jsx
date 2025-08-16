import React, { useEffect, useState } from "react"
import { format } from "date-fns"
import appraisoLogo from "../../assets/logo/Appraiso.png"
import { useNavigate } from "react-router-dom"

function Header() {
  const [userName, setUserName] = useState("")
  const [currentDateTime, setCurrentDateTime] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    setUserName(sessionStorage.getItem("userName"))

    const intervalId = setInterval(() => {
      const curntDate = new Date()
      const formtDate = format(curntDate, "hh:mm a EEE, dd MMM, yyyy")
      setCurrentDateTime(formtDate)
    }, 1000)

    // Clear the interval on component unmount
    return () => clearInterval(intervalId)
  }, [])

  const Logout = () => {
    sessionStorage.clear()
    localStorage.clear()
    navigate("/")
  }

  return (
    <div className="flex h-full justify-between items-center px-6 ">
      <div className="w-1/3">
        <img src={appraisoLogo} height={44} width={160} />
      </div>

      <div className="flex justify-end text-gray-500 text-sm items-center gap-2 w-1/3">
        <span>{currentDateTime}</span>
        <span> Welcome {userName}</span>
        <span
          className="w-7 h-7 cursor-pointer flex items-center"
          onClick={Logout}
        >
          <i
            className="pi pi-sign-out"
            style={{ fontSize: "1.5rem", color: "#569cb4" }}
          />
        </span>
      </div>
    </div>
  )
}

export default Header
