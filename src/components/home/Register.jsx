import { FaArrowRight } from "react-icons/fa";
import Section from "../Section";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <Section>
      <div className="flex justify-between items-center px-2 md:px-0">
        <div className="text-[#1A1A1A] space-y-2">
          <h3 className="text-xl md:text-3xl font-medium">
            Become a Real Estate Agent
          </h3>
          <p>We only work with the best companies around the globe</p>
        </div>
        <Link to="/register">
          <button className="btn btn-sm md:btn-md btn-warning">
            Rgister Now <FaArrowRight />
          </button>
        </Link>
      </div>
    </Section>
  );
};

export default Register;
