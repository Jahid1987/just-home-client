import PageBanner from "../components/PageBanner";
import bannerbg from "../assets/justbanner.png";
const Properties = () => {
  return (
    <div>
      <div>
        <PageBanner
          bannerBg={bannerbg}
          headline="All Properties"
          text="Easily Find Your's One"
        ></PageBanner>
      </div>
    </div>
  );
};

export default Properties;
