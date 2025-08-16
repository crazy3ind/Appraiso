import React from "react"
import "./layout.css"
import Header from "./Header"
import Left from "./Left"

const DefaultLayout = ({children}) => {
  return (
    <div className="grid w-screen h-screen">
      <header>
        <Header />
      </header>
      <div className="sidebar">
        <Left />
      </div>

      <main>{children}</main>
    </div>
  )
}

export default DefaultLayout
