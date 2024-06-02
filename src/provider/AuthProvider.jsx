import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext(null);
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  signOut,
} from "firebase/auth";
import auth from "../firebase/firebase.config";
import axios from "axios";
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // social media providers
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  // signing in user
  function signInUser(email, password) {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }
  // registering user with email and pass
  function registerWithEmailPass(email, pass) {
    setIsLoading(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  }
  // updating user profile
  function updateUserProfile(name, photo) {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  }

  // signing with google
  function registerUserWithGoogle() {
    setIsLoading(true);
    return signInWithPopup(auth, googleProvider);
  }

  // signing with facebook
  function signInWithFacebook() {
    setIsLoading(true);
    return signInWithPopup(auth, facebookProvider);
  }
  // sign out user from firebase
  function signOutUser() {
    return signOut(auth);
  }
  // user  observer
  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };

      // setting and deleting token
      if (currentUser) {
        axios
          .post("https://hj-hotel.vercel.app/jwt", loggedUser, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
            setUser(currentUser);
            setIsLoading(false);
          });
      } else {
        axios
          .post("https://hj-hotel.vercel.app/logout", loggedUser, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
            setUser(currentUser);
            setIsLoading(false);
          });
      }
    });
    return () => unsubcribe();
  }, [user?.email]);
  // console.log(user);
  const authInfo = {
    user,
    isLoading,
    signInUser,
    registerWithEmailPass,
    updateUserProfile,
    registerUserWithGoogle,
    signInWithFacebook,
    signOutUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
