import {
  FaApple,
  FaFacebook,
  FaGooglePlay,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import Section from "../Section";
import logo from "../../assets/logo.svg";

const Footer = () => {
  return (
    <Section>
      <div className="px-2 md:px-0">
        {/* Top Side */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-8 mb-8">
          <div className="flex items-center space-x-4">
            <img src={logo} />
          </div>
          <div className="flex items-center space-x-4 text-lg md:text-xl">
            <h3 className="text-lg">Follow Us</h3>
            <a href="#" className="text-white hover:text-gray-400">
              <FaFacebook />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <FaTwitter />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <FaInstagram />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Bottom Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-gray-700 pb-8 mb-8">
          <div>
            <h2 className="font-bold text-lg mb-4">Subscribe</h2>
            <input
              type="email"
              placeholder="Your e-mail"
              className="w-full p-2 mb-4 text-black"
            />
            <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2">
              Send
            </button>
            <p className="mt-2">
              Subscribe to our newsletter to receive our weekly feed.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-lg mb-4">Discover</h2>
            <ul>
              {[
                "Miami",
                "New York",
                "Chicago",
                "Florida",
                "Los Angeles",
                "San Diego",
              ].map((city) => (
                <li key={city} className="mb-2">
                  {city}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-lg mb-4">Quick Links</h2>
            <ul>
              {[
                "About",
                "Contact",
                "FAQ's",
                "Blog",
                "Pricing Plans",
                "Privacy Policy",
                "Terms & Conditions",
              ].map((link) => (
                <li key={link} className="mb-2">
                  {link}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-lg mb-4">Contact Us</h2>
            <p>hi@justhome.com</p>
            <p>(123) 456-7890</p>
            <h2 className="font-bold text-lg mt-4 mb-4">Our Address</h2>
            <p>99 Fifth Avenue, 3rd Floor</p>
            <p>San Francisco, CA 1980</p>
            <h2 className="font-bold text-lg mt-4 mb-4">Get the app</h2>
            <div className="flex space-x-5">
              <a href="#" className="block">
                <FaApple />
              </a>
              <a href="#" className="block">
                <FaGooglePlay />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 text-center">
          <p>Copyright © 2024, JustHome</p>
        </div>
      </div>
    </Section>
  );
};

export default Footer;
