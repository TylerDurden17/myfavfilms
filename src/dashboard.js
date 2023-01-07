import React, { useEffect, useState } from "react";
import SearchBar from './SearchBar';
import FavoriteList from './FavoriteList';
import {auth} from './firebase'
import { signOut } from "firebase/auth";
//import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
//import { redirect } from "react-router-dom";

const Logout = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log('logged out');
        //window.location.href="/"
        //Navigate('/');
    }).catch((error) => {
        // An error happened.
        console.log(error);
    });
}
const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    /*The onAuthStateChanged method is called every time the component is rendered, which may result in multiple 
    subscriptions being created and causing unexpected behavior.

    The onAuthStateChanged method is an asynchronous function, which means that the component will always render before 
    the user object is updated. This will cause the component to always render the "signed out" content first, and 
    then re-render with the "signed in" content after the user object is updated.

    To fix these issues, you can use the useEffect hook to create a single subscription that listens for changes 
    in the user's authentication state and updates the component's state accordingly. */
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          setUser(authUser);
        } else {
          //setUser(null);
          console.log('no');
          navigate('/')
        }
      });
      return () => unsubscribe();
    }, []);


    return (
      <div>
        {user ? (
        <div>
          <header>
            <h1>My Favorite Films</h1>
          </header>
          <button onClick={Logout}>Log out</button>
          <h3>{ " " + user.displayName }</h3>
          <SearchBar />
          <FavoriteList />
        </div>
      ) : (
        <div>
          <h1>Redirecting to sign in ...</h1>
        </div>
      )}
      </div>
    );
  };

export default Dashboard;