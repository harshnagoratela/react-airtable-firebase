import React from "react"
import { Link } from "gatsby"
import { Card } from "react-bootstrap"
import Header from "../Header"
import ScrollupButton from "../ScrollupButton"
import Footer from "../Footer"

// Global styles.
import "./admin.css"

const Layout = ({ location, title, children }) => {

  return (
    <div>
      <Header />
      <Card border="light">
        <Card.Body>
            <main>{children}</main>
        </Card.Body>
        <Card.Footer className="text-muted position-sticky"><Footer /></Card.Footer>
      </Card>
      <ScrollupButton />
    </div>
  )
}

export default Layout
