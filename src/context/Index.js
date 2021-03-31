import React, { useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
const AppContext = React.createContext();

export function useConsumerAuth() {
  return useContext(AppContext);
}

export default function AppAuthProvider({ children }) {
  const [consumer, setConsumer] = useState();
  const [loading, setLoading] = useState(true);

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function signUp(email, password, name, userType) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setConsumer(user);
      setLoading(false);
      if (user) {
        console.log(user.uid);
      }
    });

    return unsubscribe;
  }, []);

  const values = {
    consumer,
    signUp,
    login,
    logout,
  };

  return (
    <AppContext.Provider value={values}>
      {!loading && children}
    </AppContext.Provider>
  );
}
