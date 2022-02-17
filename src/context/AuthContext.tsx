import { createContext, FC, useContext, useEffect, useState } from "react";
import { IAuthContext, IAuthErrors, IUser } from "../utils/interfaces";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../libs/firebase.config";
import photo from "../assets/photo.jpg";

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState<object | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<IAuthErrors>({
    login: { code: "" },
    register: { code: "" },
    logout: { code: "" },
  });

  const signUp = async ({ name, email, password }: IUser) => {
    try {
      setLoading(true);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, {
        displayName: name,
      });
    } catch (err: any) {
      setErrors({
        login: { code: "" },
        register: err,
        logout: { code: "" },
      });
      console.log(err);
    }
    setLoading(false);
  };

  const authenticate = async ({ email, password }: IUser) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err, "error");
      setErrors({
        login: err,
        register: { code: "" },
        logout: { code: "" },
      });
    }
    setLoading(false);
  };

  const logOut = () => {
    try {
      signOut(auth);
    } catch (err) {
      console.log(err, "error");
      setErrors({
        login: { code: "" },
        register: { code: "" },
        logout: err,
      });
    }
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
    <AuthContext.Provider
      value={{
        signUp,
        authenticate,
        logOut,
        user,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext<IAuthContext>(AuthContext);
