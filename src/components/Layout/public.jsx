import React from "react"
import { Link } from "gatsby"
import { Card } from "react-bootstrap"
import ScrollupButton from "../ScrollupButton"
import Footer from "../Footer"

// Global styles.
import "./public.css"

const LayoutPublic = ({ location, title, children }) => {
  return (
    <div>
      <Card border="light">
      <Card.Header as="h1" className="text-center bg-primary text-light"><br/>{title}<br/><br/></Card.Header>
        <Card.Body>
            <main>{children}</main>
        </Card.Body>
        <Card.Footer className="text-muted"><Footer /></Card.Footer>
      </Card>
      <ScrollupButton />
    </div>
  )
}

export default LayoutPublic
