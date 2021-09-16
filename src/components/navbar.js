import React from "react"
import { Link } from "gatsby"

const Navbar = () => {
  return (
    <div>
      <Link to={"/pages"}>Pages</Link>
      <Link to={"/blog"}>Blog</Link>
    </div>
  )
}

export default Navbar
