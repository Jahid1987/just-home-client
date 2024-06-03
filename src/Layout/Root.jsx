import { Outlet } from "react-router-dom";
import Footer from "../components/home/Footer";

const Root = () => {
  return (
    <div className="p-2 max-w-[1440px] mx-auto">
      <Outlet></Outlet>

      {/* footer section  */}
      <div
        style={{
          borderRadius: "24px",
          background: "#1A1A1A",
        }}
        className="py-1 my-2 text-white"
      >
        <Footer />
      </div>
    </div>
  );
};

export default Root;
