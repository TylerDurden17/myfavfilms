import { initializeApp } from 'firebase/app';
import React, {useEffect} from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
//import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



//import { Navigate } from "react-router-dom";
// TODO: Replace the following with your app's Firebase project configuration
const REACT_APP_firebase_api_key = process.env.REACT_APP_firebase_api_key;
const REACT_APP_firebase_authDomain = process.env.REACT_APP_firebase_authDomain;
const REACT_APP_firebase_projectId = process.env.REACT_APP_firebase_projectId;
const REACT_APP_firebase_storageBucket = process.env.REACT_APP_firebase_storageBucket;
const REACT_APP_firebase_messagingSenderId = process.env.REACT_APP_firebase_messagingSenderId;
const REACT_APP_firebase_appId = process.env.REACT_APP_firebase_appId;
const REACT_APP_firebase_measurementId = process.env.REACT_APP_firebase_measurementId;

//import { Navigate } from "react-router-dom";
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: `${REACT_APP_firebase_api_key}`,
    authDomain: `${REACT_APP_firebase_authDomain}`,
    projectId: `${REACT_APP_firebase_projectId}`,
    storageBucket: `${REACT_APP_firebase_storageBucket}`,
    messagingSenderId: `${REACT_APP_firebase_messagingSenderId}`,
    appId: `${REACT_APP_firebase_appId}`,
    measurementId: `${REACT_APP_firebase_measurementId}`
};
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

export const auth = getAuth(app);

const handleLogin = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
      //console.log(user);
      //navigate('/dashboard');
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

const Login = () => {
  const navigate = useNavigate();
  
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
          if (authUser) {
            //setUser(authUser);
            console.log('LoginYes');
            //console.log(authUser);
            navigate('/dashboard')
          }
        });
    
        return () => unsubscribe();
      }, []);

  return (
    <div>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
    
}

export default Login;