import React from "react"
import { Link } from "gatsby"

const Header = () => (
  <nav className="w-full flex items-center justify-between bg-blue-700 p-6">
    <div className="items-center w-1/2 text-white mr-6">
      <span className="font-semibold text-xl"><Link to="/">Hyper</Link></span>
    </div>
    <div className="w-1/2 mt-1 text-md flex flex-row-reverse">
      <Link to="/app/profile" className="block text-white hover:text-grey-500 mr-4">
          Profile
      </Link>
      <Link to="/" className="block text-white hover:text-grey-500 mr-4">
          Home
      </Link>
    </div>
  </nav>
)

export default Header
