import Banner from "../Banner";
import bannerbg from "../../assets/justbanner.png";
import PrimaButton from "../PrimaryButton";
import { FaSearch } from "react-icons/fa";
const HomeBanner = () => {
  return (
    <Banner banner={bannerbg}>
      <div className="text-center w-11/12 md:w-6/12 lg:w-5/12 space-y-3">
        <PrimaButton name="LET US GUIDE YOUR HOME" />
        <h1 className="text-2xl md:text-3xl lg:text-5xl text-white ">
          Discover a place you will love to live
        </h1>
        <label className="input input-sm md:input-md border-none flex items-center gap-2 rounded-full">
          <input
            type="text"
            className="grow "
            placeholder="Enter Name, Keywords..."
          />
          <span className="p-[6px] md:p-3 bg-[#E7C873] rounded-full -mr-2">
            <FaSearch />
          </span>
        </label>
      </div>
    </Banner>
  );
};

export default HomeBanner;
