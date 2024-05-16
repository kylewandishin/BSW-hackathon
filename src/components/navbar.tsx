import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css'; // Ensure you have TailwindCSS installed and configured
import logo from '../assets/ECOBites.webp';

export default function Topbar() {
  return (
    <div className="bg-white shadow-md h-[4rem] flex items-center justify-between px-4 md:px-8 w-full fixed top-0 z-10">
      <div className="flex items-center space-x-2">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 md:w-12 md:h-12 bg-gray-300 flex items-center justify-center rounded-full">
            <img className="md:w-14 w-10" src={logo} alt="logo" />
            {/* <span className="text-white font-bold">Logo</span> */}
          </div>
          <span className="text-gray-800 md:text-xl text-lg hover:text-gray-600 transition-colors font-Courier New">
            Home
          </span>
        </Link>
        <Link
          to="/Resturants"
          className="text-gray-800 md:text-xl text-lg hover:text-gray-600 transition-colors font-Courier New"
        >
          Resturants
        </Link>
        <Link
          to="/dashboard"
          className="text-gray-800 md:text-xl text-lg hover:text-gray-600 transition-colors font-Courier New"
        >
          Dashboard
        </Link>
        <Link
          to="/myresturant"
          className="text-gray-800 md:text-xl text-lg hover:text-gray-600 transition-colors font-Courier New"
        >
          My Resturant
        </Link>
      </div>
      <div className="flex items-center space-x-2">
        <Link to="/signin">
          <div className="bg-[#edeea6] text-gray-800 md:text-base text-sm px-3 py-2 md:w-[10rem] w-[4rem] hover:bg-[#ecec87] h-full flex items-center justify-center rounded-lg transition-colors">
            Buisness Sign in
          </div>
        </Link>
      </div>
    </div>
  );
}
