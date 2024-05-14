import { Link } from 'react-router-dom';

export default function Topbar() {
  return (
    <div className="bg-[#fcfcfc] h-[4rem] flex flex-row justify-between min-w-[200px] w-full absolute">
      <Link to="/team">
        <div className="flex flex-row">
          {/* <img className="md:w-14 w-10" src={logo} alt="logo" /> */}
          <div className="md:w-14 w-10">logo</div>
          <div className="md:text-5xl text-3xl text-gray-800 flex items-center">
            ECO-bites
          </div>
        </div>
      </Link>
      <div className="flex flex-row h-full">
        <Link to="/signin">
          <div
            // onClick={handleGoogleSignIn}
            className="bg-[#edeea6] text-gray-800 md:text-xl text-sm px-3 py-2 md:w-[7rem] w-[5rem] hover:bg-[#ecec87] h-full flex items-center justify-center border-b-2 border-b-slate-50"
          >
            Sign in
          </div>
        </Link>
        <Link to="/signin">
          <div
            // onClick={handleGoogleSignIn}
            className="bg-[#eea6db] text-gray-800 md:text-xl text-sm px-3 py-2 md:w-[7rem] w-[5rem] hover:bg-[#ec87d8] h-full flex items-center justify-center border-b-2 border-b-slate-50"
          >
            Sign up
          </div>
        </Link>
      </div>
    </div>
  );
}
