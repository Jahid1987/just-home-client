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
import { axiosPublic } from "../hooks/useAxiosPublic";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [savedUser, setSavedUser] = useState(null);
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
  function logOutUser() {
    return signOut(auth);
  }
  // user  observer
  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const { data } = await axiosPublic.get(`/users/${currentUser.email}`);
        setSavedUser(data);
        setIsLoading(false);
      } else {
        setUser(currentUser);
        setIsLoading(false);
        setSavedUser(null);
      }
    });
    return () => unsubcribe();
  }, [user?.email]);
  // console.log(user);
  const authInfo = {
    user,
    setUser,
    isLoading,
    savedUser,
    signInUser,
    registerWithEmailPass,
    updateUserProfile,
    registerUserWithGoogle,
    signInWithFacebook,
    logOutUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
