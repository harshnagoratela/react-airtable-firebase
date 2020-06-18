import React from "react"
import { Link } from "gatsby"
import { Card } from "react-bootstrap"
import ScrollupButton from "../ScrollupButton"
import Footer from "../Footer"

const LayoutPublic = ({ location, title, subtitle, children }) => {
  return (
    <div>
      <Card border="light">
        {title &&
          <Card.Header as="h1" className="text-center bg-primary text-light"><br />{title}</Card.Header>
        }
        {subtitle &&
          <Card.Header as="h3" className="text-center bg-primary text-light">{subtitle}<br /><br /></Card.Header>
        }
        <Card.Body className="bg-light">
          <main>{children}</main>
        </Card.Body>
        <Card.Footer className="text-muted"><Footer /></Card.Footer>
      </Card>
      <ScrollupButton />
    </div>
  )
}

export default LayoutPublic
