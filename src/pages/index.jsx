import React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Status from "../components/Status"
import Projects from "../components/Projects"
import { Button } from 'react-bootstrap';
import { isLoggedIn} from "../utils/auth"

const Index = () => {
  
  return (
  <Layout>
    <Status /> 
    {isLoggedIn() &&
      <Projects />
    }

    {!isLoggedIn() && 
      <Button variant="primary" href="/app/login">Login with Firebase</Button>
    }
  </Layout>
)
}
export default Index
