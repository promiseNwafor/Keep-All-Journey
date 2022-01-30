import { createContext, FC, useContext, useEffect, useState } from "react";
import { IAuthContext, IUser } from "../utils/interfaces";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../libs/firebase.config";

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState<object | null>(null);

  const signUp = ({ email, password }: IUser) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const authenticate = ({ email, password }: IUser) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      if (currentUser) {
        localStorage.setItem("user", "true");
        setUser(currentUser);
      } else {
        localStorage.removeItem("user");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ signUp, authenticate, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext<IAuthContext>(AuthContext);
