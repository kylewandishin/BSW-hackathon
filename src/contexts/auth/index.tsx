import {
  useContext,
  createContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../../firebase'; // Ensure the correct path is used

type AuthContextProps = {
  children: ReactNode;
};

const AuthContext = createContext<any>(null);

export const AuthContextProvider = (props: AuthContextProps) => {
  const { children } = props;
  const [user, setUser] = useState<object | null>(null);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
export default useAuth;
