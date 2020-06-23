import React from "react"
import { getUser, getUserExtras } from "../utils/auth"
import { Form } from 'react-bootstrap';
import firebase from "gatsby-plugin-firebase"
import axios from 'axios'


const Activation = () => {
  const user = getUser();
  const userExtras = getUserExtras();
  const plan = userExtras.paymentId ? "paid" : "free";
  const { email } = user;

  const [validated, setValidated] = React.useState(false);
  const [key, setKey] = React.useState("");
  const [message, setMessage] = React.useState();

  const isLicenseValid = () => {

    const license = {
      "product_permalink": "WHvhf1",
      "license_key": "C9B83BEC-DC1A43C1-9CBFF146-7A2277DE"
    };
    const config = {
      method: 'post',
      url: '/.netlify/functions/validate',
      params: license,
      baseURL: 'https://gumroad-license-validator.netlify.app',
    }

    axios(config)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.error(err);
      })

    //axios.post(`https://api.gumroad.com/v2/licenses/verify`, { license })
    /*
    axios({
      method: 'post',
      url: 'https://api.gumroad.com/v2/licenses/verify',
      data: license,
      headers: { 'Content-Type': 'multipart/form-data', }
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
        console.log(error);
    });
    */
    return false;
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    if (form.checkValidity()) {
      //check from gumroad if the supplied license key is valid or not
      if (!isLicenseValid("test")) {
        setMessage("License key is invalid")
        return;
      }
      /*
      const deleteProject = (slug) => {
        console.log("*********** deleteProject")
        console.log(`users/${user.uid}/projects/${slug}`)
        firebase
            .database()
            .ref()
            .child(`users/${user.uid}/projects/${slug}`)
            .remove()
            .then(() => window.location.reload());
    };
    */
    }
  };

  return (
    <div className="container w-100 mx-auto">
      <div className="row">
        <div className="col-lg-3">&nbsp;</div>
        <div className="col-lg-6 bg-light p-4">
          <h1>Subscription Activation Service</h1>
          {plan && plan !== "free" &&
            <h5>You are already having an active subscription till ""</h5>
          }

          {plan && plan === "free" &&
            <div>
              <h5 className="mt-3 mb-1">Your Email</h5>
              <div className="p-2 bg-white">{`${email}`}</div>
              <h5 className="mt-3 mb-1">Enter your license key here</h5>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Control
                  type="text"
                  placeholder="xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxx"
                  onChange={({ target: { value } }) => {
                    setKey(value);
                  }}
                  required
                />
                <input type="submit" className="btn btn-primary mt-3" value="Activate"></input>
              </Form>
              <p className="mt-1 mb-1 text-danger">{message}</p>
            </div>
          }
        </div>
        <div className="col-lg-3">&nbsp;</div>
      </div>
    </div>
  )
}

export default Activation
