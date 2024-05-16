import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css'; // Ensure you have TailwindCSS installed and configured
import logo from '../assets/ECOBites.webp';
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase/index';
import { useEffect, useState } from 'react';

export default function Topbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google: ', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <div className="bg-white shadow-md h-[4rem] flex items-center justify-between px-4 md:px-8 w-full fixed top-0 z-10">
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center space-x-2 border-r border-gray-300 pr-4">
          <div className="w-8 h-8 md:w-12 md:h-12 bg-gray-300 flex items-center justify-center rounded-full">
            <img className="md:w-14 w-10" src={logo} alt="logo" />
          </div>
          <span className="text-gray-800 md:text-xl text-lg hover:text-gray-600 transition-colors font-Courier New">
            Home
          </span>
        </Link>
        <Link
          to="/restaurants"
          className="text-gray-800 md:text-xl text-lg hover:text-gray-600 transition-colors font-Courier New border-r border-gray-300 pr-4"
        >
          Restaurants
        </Link>
        {user && (
          <>
            <Link
              to="/dashboard"
              className="text-gray-800 md:text-xl text-lg hover:text-gray-600 transition-colors font-Courier New border-r border-gray-300 pr-4"
            >
              Dashboard
            </Link>
            <Link
              to="/myrestaurant"
              className="text-gray-800 md:text-xl text-lg hover:text-gray-600 transition-colors font-Courier New border-r border-gray-300 pr-4"
            >
              My Restaurant
            </Link>
            <Link
              to="/leaderboard"
              className="text-gray-800 md:text-xl text-lg hover:text-gray-600 transition-colors font-Courier New border-r border-gray-300 pr-4"
            >
              Leaderboard
            </Link>
          </>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {!user ? (
          <div
            onClick={handleGoogle}
            className="bg-[#edeea6] text-gray-800 md:text-base text-sm px-3 py-2 md:w-[10rem] w-[4rem] hover:bg-[#ecec87] h-full flex items-center justify-center rounded-lg transition-colors cursor-pointer"
          >
            Business Sign in
          </div>
        ) : (
          <div
            onClick={handleSignOut}
            className="bg-[#edeea6] text-gray-800 md:text-base text-sm px-3 py-2 md:w-[10rem] w-[4rem] hover:bg-[#ecec87] h-full flex items-center justify-center rounded-lg transition-colors cursor-pointer"
          >
            Sign Out
          </div>
        )}
      </div>
    </div>
  );
}
