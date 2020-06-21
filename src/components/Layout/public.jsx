import React from "react"
import { Link } from "gatsby"
import { Card } from "react-bootstrap"
import ScrollupButton from "../ScrollupButton"
import Footer from "../Footer"

const LayoutPublic = ({ location, title, subtitle, children }) => {
  return (
    <div>
      <Card border="light">        
        <Card.Body className="bg-light p-0">
          <main>{children}</main>
        </Card.Body>
        <Card.Footer className="text-muted"><Footer /></Card.Footer>
      </Card>
      <ScrollupButton />
    </div>
  )
}

export default LayoutPublic
