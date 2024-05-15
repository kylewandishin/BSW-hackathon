import houses from '../assets/houses.png';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="w-[80%] h-[80%] flex flex-col text-5xl mx-[10%] mt-[1rem]">
      <div className="w-full text-lg flex flex-col justify-between h-[90%]">
        <div>
          &lt;html&gt;
          <div className="px-5">&lt;body&gt;</div>
        </div>

        <div className="mx-[10%] my-5 bg-red-50 w-[80%] h-[60%] text-3xl relative overflow-hidden flex items-end">
          <Link to="/" className="bg-[#6dab92] text-slate-800">
            <div className="absolute top-0 left-0 bg-slate-50 bg-opacity-50 p-2">
              this is not the page you were looking for...
            </div>

            <img
              src={houses}
              alt="a pretty view"
              className="w-full mb-[-11%] ml-[-4%]"
            />
          </Link>
        </div>

        <div>
          <div className="px-5">&lt;/body&gt;</div>
          &lt;/html&gt;
        </div>
      </div>
    </div>
  );
}
