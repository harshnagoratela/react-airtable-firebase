import React from "react"
import Statistics from "./Statistics"
import { getUser, getUserExtras, getUserType } from "../utils/auth"
import { Helmet } from 'react-helmet';

const Profile = () => {
  const user = getUser();
  const userExtras = getUserExtras();
  let subscriptionEndDate;
  if(userExtras.subscription && userExtras.subscription.license && userExtras.subscription.license.purchase && userExtras.subscription.license.purchase.sale_timestamp) {
    let saleDate = new Date(userExtras.subscription.license.purchase.sale_timestamp);
    subscriptionEndDate = new Date(saleDate.setMonth(saleDate.getMonth()+1));    
  }
  const plan = getUserType();
  const { email, emailVerified } = user;
  const displayName = user.displayName ? user.displayName : "Name not captured";

  return (
    <div className="container w-100 mx-auto">
      <Helmet>
        <script src="https://gumroad.com/js/gumroad.js"></script>
      </Helmet>
      <div className="row">
        <div className="col-lg-3">&nbsp;</div>
        <div className="col-lg-6 bg-light p-4">
          <Statistics />
          <h1>Your Profile</h1>
          <h5 className="mt-3 mb-1">Name</h5>
          <div className="p-2 bg-white">{`${displayName}`}</div>
          <h5 className="mt-3 mb-1">Email</h5>
          <div className="p-2 bg-white">{`${email}`}</div>
          <h5 className="mt-3 mb-1">Email Verified</h5>
          <div className="p-2 bg-white">{`${emailVerified}`}</div>
          <h5 className="mt-3 mb-1">Plan</h5>
          <div className="p-2 bg-white">{`${plan}`}</div>
          {plan && plan !== "free" &&
            <>
              <h5 className="mt-3 mb-1">Subscription till</h5>
              <div className="p-2 bg-white">{`${subscriptionEndDate.toString()}`}</div>
            </>
          }
          {plan && plan === "free" &&
            <div className="py-3">
              <a className="btn btn-success" href="https://gum.co/WHvhf?wanted=true" target="_blank" data-gumroad-single-product="true">Subscribe with us</a>
            </div>
          }
        </div>
        <div className="col-lg-3">&nbsp;</div>
      </div>
    </div>
  )
}

export default Profile
