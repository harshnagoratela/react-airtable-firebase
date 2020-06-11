import React from "react"

const Footer = () => {

  return (
    <div>
      <footer className="d-flex">
        <div className="w-100">
          © {new Date().getFullYear()} Copyright, Hyperlyst.com
        </div>
        <div className="w-100 text-right">Built by{` `}
          <a href="https://www.hyperlyst.com">Hyperlyst</a>
        </div>
      </footer>
    </div>
  )
}

export default Footer
