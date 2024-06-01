import Advertisement from "../components/home/Advertisement";
import BestProperties from "../components/home/BestProperties";
import Footer from "../components/home/Footer";
import HomeBanner from "../components/home/HomeBanner";
import LocalExpertise from "../components/home/LocalExpertise";
import PropertiesInCities from "../components/home/PropertiesInCities";
import Register from "../components/home/Register";
import Reviews from "../components/home/Reviews";
import WhyChoose from "../components/home/WhyChoose";

const Home = () => {
  return (
    <div>
      <HomeBanner />
      {/* Advertisement section  */}
      <div
        style={{
          borderRadius: "24px",
          background: "#F6F8FA",
        }}
        className="py-5 my-2"
      >
        <Advertisement />
      </div>
      <PropertiesInCities />
      {/* why choose us section  */}
      <div
        style={{
          borderRadius: "24px",
          background: "#E7C873",
        }}
        className="py-5 my-2"
      >
        <WhyChoose />
      </div>
      <BestProperties />
      {/* local expertise section  */}
      <div
        style={{
          borderRadius: "24px",
          background: "#1F4B43",
        }}
        className="py-5 my-2"
      >
        <LocalExpertise />
      </div>
      {/* review section  */}
      <div>
        <Reviews />
      </div>
      {/* article section  */}
      <div
        style={{
          borderRadius: "24px",
          background: "#FFF8F6",
        }}
        className="py-1 my-2"
      >
        <Register />
      </div>
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

export default Home;
