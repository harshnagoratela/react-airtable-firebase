import React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import View from "../components/View"
import Status from "../components/Status"
import Projects from "../components/Projects"
import { getUser, isLoggedIn} from "../utils/auth"

const Index = () => {
  const user = getUser();
  const { displayName, email } = user;

  return (
  <Layout>
    <Status />
    <View title="Welcome to Hyper" className="items-center">
    {isLoggedIn() &&
      <Projects />
    }

    {!isLoggedIn() && 
      <button class="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          <Link to="/app/login">Login with Firebase</Link>
        </button>
    }
        
    </View>
  </Layout>
)
}
export default Index
