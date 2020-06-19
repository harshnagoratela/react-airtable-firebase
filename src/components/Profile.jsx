import React from "react"
import { Card } from "react-bootstrap"
import { getUser, getUserExtras } from "../utils/auth"

const Profile = () => {
  const user = getUser();
  const userExtras = getUserExtras();
  console.log(userExtras)
  const projects = (userExtras && userExtras.projects) ? Object.keys(userExtras.projects).length : 0;
  const plan = userExtras.paymentId ? "paid" : "free";
  const { email, emailVerified } = user;
  const displayName = user.displayName ? user.displayName : "Name not captured";

  return (
    <div className="container w-100 mx-auto">
      <div className="row">
        <div className="col-lg-3">&nbsp;</div>
        <div className="col-lg-6 bg-light p-4">
          <h1>Your Profile</h1>
          <h5 className="mt-3 mb-1">Name</h5>
          <div className="p-2 bg-white">{`${displayName}`}</div>
          <h5 className="mt-3 mb-1">Email</h5>
          <div className="p-2 bg-white">{`${email}`}</div>
          <h5 className="mt-3 mb-1">Email Verified</h5>
          <div className="p-2 bg-white">{`${emailVerified}`}</div>
          <h5 className="mt-3 mb-1">Plan</h5>
          <div className="p-2 bg-white">{`${plan}`}</div>
          <div className="row m-3">
            <div className="col-lg-6">
              <Card border="warning" className="text-center">
                <Card.Body>
                  <Card.Title>Total Pages</Card.Title>
                  <Card.Text>
                    {projects}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div className="col-lg-6">
              <Card border="success" className="text-center">
                <Card.Body>
                  <Card.Title>Published Pages</Card.Title>
                  <Card.Text>
                    {projects}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
        <div className="col-lg-3">&nbsp;</div>
      </div>
    </div>
  )
}

export default Profile
