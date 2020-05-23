import React from "react"
import { Link } from "gatsby"

const Header = () => (
  <nav className="w-full flex items-center justify-between bg-blue-700 p-6">
    <div className="items-center w-1/3 text-white mr-6">
      <span className="font-semibold text-xl"><Link to="/">Hyper</Link></span>
    </div>
    <div className="w-2/3 mt-1 text-md flex flex-row-reverse">
      <Link to="/app/project/create" className="block text-white hover:text-grey-500 mr-4">
          Create Project
      </Link>
      <Link to="/" className="block text-white hover:text-grey-500 mr-4">
          Home
      </Link>
    </div>
  </nav>
)

export default Header
