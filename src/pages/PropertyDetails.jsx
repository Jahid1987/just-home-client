import { useLoaderData } from "react-router-dom";
import bannerBg from "../assets/detailsbanner.png";
import PageBanner from "../components/PageBanner";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import Section from "../components/Section";
import Review from "../components/propertyDetails/Review";

const PropertyDetails = () => {
  const { data: property } = useLoaderData();
  const {
    title,
    location,
    image,
    details,
    price_range,
    reviews,
    verification_status,
  } = property;
  return (
    <div>
      <PageBanner
        bannerBg={bannerBg}
        headline="Details Of"
        text={property.title}
      />
      {/* property details  */}
      <Section>
        <div className="flex flex-col md:flex-row overflow-hidden m-2 md:m-4">
          <div className="md:w-1/2">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 md:w-1/2">
            <div className="flex items-center justify-between">
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs uppercase font-semibold">
                {verification_status}
              </span>
              <span className="bg-yellow-400 text-white px-3 py-1 rounded-full text-xs uppercase font-semibold">
                Featured
              </span>
            </div>
            <h1 className="text-3xl font-bold mt-4">{title}</h1>
            <p className="text-gray-600">
              <i className="fas fa-map-marker-alt"></i> {location}
            </p>
            <p className="mt-4 text-gray-700">{details}</p>
            <div className="flex items-center mt-4">
              <FaBed className="text-gray-600 w-5 h-5 mr-2" />
              <span className="mr-4">4 Beds</span>
              <FaBath className="text-gray-600 w-5 h-5 mr-2" />
              <span className="mr-4">2 Baths</span>
              <FaRulerCombined className="text-gray-600 w-5 h-5 mr-2" />
              <span>350 sqft</span>
            </div>
            <p className="text-2xl font-bold text-red-600 mt-4">
              ${price_range}
            </p>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-full mt-4 hover:bg-yellow-600 transition duration-200">
              Learn More
            </button>
          </div>
        </div>
      </Section>
      {/* property reviews */}
      <Section sectionhead="What our client say...">
        {!reviews.length > 0 && <p>No reviews yet.</p>}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {reviews?.map((review, index) => (
            <Review review={review} key={index}></Review>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default PropertyDetails;
