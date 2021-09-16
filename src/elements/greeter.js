import React from "react"
import { Link } from "gatsby"
import { domToReact } from "html-react-parser"

const Greeter = ({ datatype, children }) => {
  console.log("kids", children)
  return (
    <div>
      <Link to={"/"}>
        <h1>I am a {datatype}</h1>
        {domToReact(children)}
      </Link>
    </div>
  )
}

export default Greeter
