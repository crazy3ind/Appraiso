import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "primereact/button"
import { PanelMenu } from "primereact/panelmenu"

const Left = () => {
  const [expanded, setExpanded] = useState(false)
  const [activeItem, setActiveItem] = useState(null)
  const navigate = useNavigate()

  const sidebarItems = [
    {
      label: "Dashboard",
      icon: "pi pi-home",
      command: () => {
        navigate("/dashboard")
        setActiveItem("dashboard")
      },
    },
    {
      label: "Employee",
      icon: "pi pi-users",
      command: () => {
        navigate("/employee")
        setActiveItem("master")
      },
    }
    /* {
      label: "Employee",
      icon: "pi pi-users",
      command: () => {
        setActiveItem("master")
      },
      items: [
        {
          label: "Manage Employees",
          icon: "pi pi-user-edit",
          command: () => navigate("/employee/manage"),
        },
      ],
      expanded: activeItem === "master",
    }, */
  ]

  return (
    <div
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={`sidebar border-r-2 border-gray-200 h-screen transition-all duration-300 ease-in-out ${expanded ? "w-64" : "w-15"
        }`}
    >
      <div className="p-4 flex items-center justify-center h-16">
        <Button
          icon={expanded ? "pi pi-times" : "pi pi-bars"}
          onClick={() => setExpanded(!expanded)}
          text
          rounded
          style={{ color: "black" }}
        />
      </div>

      <div className="flex flex-col py-2 px-2">
        {expanded ? (
          <PanelMenu
            model={sidebarItems}
            className="w-full"
            style={{ background: "transparent", border: "none", color: "white" }}
            multiple
          />
        ) : (
          sidebarItems.map((item, index) => (
            <Button
              key={index}
              icon={item.icon}
              onClick={() => {
                item.command()
                if (item.items) {
                  setActiveItem(item.label.toLowerCase())
                }
              }}
              className="w-full justify-start items-start"
              style={{ color: "black" }}
              text
              tooltip={item.label}
              tooltipOptions={{ position: "right" }}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Left
