import React from "react"
import { Router } from "@reach/router"
import ProjectPublicView from "../components/Projects/publicview"

const Public = () => {
  console.log("**** include public space")
  let host = window.location.host;
  let protocol = window.location.protocol;
  let parts = host.split(".");
  let subdomain = "";
  // If we get more than 3 parts, then we have a subdomain
  // INFO: This could be 4, if you have a co.uk TLD or something like that.
  if (parts.length >= 3) {
    subdomain = parts[0];
    // Remove the subdomain from the parts list
    parts.splice(0, 1);
    // Set the location to the new url
    //window.location = protocol + "//" + parts.join(".") + "/" + subdomain;
    let newURL = protocol + "//" + parts.join(".") + "/" + subdomain;
    console.log("**** newURL is going to be = "+newURL);
  }
  return (
    <Router>
      <ProjectPublicView path="/public/:userid/project/:slug" />
    </Router>
  )
}

export default Public
