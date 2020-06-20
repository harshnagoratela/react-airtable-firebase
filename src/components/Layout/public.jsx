import React from "react"
import { Link } from "gatsby"
import { Card } from "react-bootstrap"
import ScrollupButton from "../ScrollupButton"
import Footer from "../Footer"

const LayoutPublic = ({ location, title, subtitle, children }) => {
  return (
    <div>
      <Card border="light">
        <br />
        {title &&
          <Card.Header as="h1" className="text-dark bg-white border-0">{title}</Card.Header>
        }
        {subtitle &&
          <Card.Header as="h3" className="text-dark bg-white border-0">{subtitle}</Card.Header>
        }
        <br />
        <Card.Body className="bg-light p-0 border-top">
          <main>{children}</main>
        </Card.Body>
        <Card.Footer className="text-muted"><Footer /></Card.Footer>
      </Card>
      <ScrollupButton />
    </div>
  )
}

export default LayoutPublic
