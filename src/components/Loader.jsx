import { loader } from "../assets";
const Loader = ({ title }) => (
  <div className="w-full justify-center items-center flex flex-col">
    <img src={loader} alt="loader" className="w-32 h-32 object-contain" />
    <h1 className="mt-2 text-white text-2xl font-bold">
      {title || "Loading..."}
    </h1>
  </div>
);

export default Loader;
