import React from "react"
import View from "./View"
import { getUser } from "../utils/auth"
import firebase from "gatsby-plugin-firebase"

const Profile = () => {
  const user = getUser();
  const { displayName, email, emailVerified } = user;
  const accessToken = user.stsTokenManager.accessToken; 

  //const [firebase, setFirebase] = useState();

  React.useEffect(() => {
    //setFirebase(firebase);
    console.log(firebase);
    console.log(firebase.database());
    console.log(firebase.firestore());

    /* Add Example */
    var messageListRef = firebase.database().ref('/messages/');
    var newMessageRef = messageListRef.push();
    newMessageRef.set({
    'userId': 'testuser',
    'text': 'The Analytical Engine weaves algebraical patterns just as the Jacquard loom weaves flowers and leaves.'
    });
    // We've appended a new message to the message_list location.
    var path = newMessageRef.toString();
    console.log("path = "+path);
    /* Add Example */

    /* List Example */
    firebase.database().ref('/messages/').once('value').then(function(snapshot) {
        //var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        console.log("***************")
        console.log(snapshot.val())
    });
    /* List Example */
        
  }, [])
  
  return (
    <View title="Your Profile">
        <div>
          <p className="text-sm text-gray-600 flex items-center mb-4">
            <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
            </svg>
            Members only
          </p>
          <p className="text-gray-700 text-base">
            <ul>
                <li> 
                  <div className="text-sm"><b>Name</b>:</div> 
                  <div className="pl-2 ">{`${displayName}`}</div>
                </li>
                <li> 
                  <div className="text-sm"><b>Email</b>:</div> 
                  <div className="pl-2 ">{`${email}`}</div>
                  </li>
                <li> 
                  <div className="text-sm"><b>Email Verified</b>:</div> 
                  <div className="pl-2 ">{`${emailVerified}`}</div>
                  </li>
                <li> 
                  <div className="text-sm"><b>Firebase Access Token</b>:</div> 
                  <div className="pl-2 truncate" >{`${accessToken}`}</div>
                </li>
            </ul>
          </p>
        </div>
    </View>
  )
}

export default Profile
