import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/Layout"
import Profile from "../components/Profile"
import ProjectCreate from "../components/Projects/create"
import Login from "../components/Login"
import PrivateRoute from "../components/PrivateRoute"
import Status from "../components/Status"
import ProjectPublicView from "../components/Projects/publicview"

const App = () => (
  <Layout>
    <Status />
    <Router>
      <PrivateRoute path="/app/project/create" component={ProjectCreate} />
      <PrivateRoute path="/app/profile" component={Profile} />
      <Login path="/app/login" />
      <ProjectPublicView path="/app/:userid/project/:slug" />
    </Router>
  </Layout>
)

export default App
