import { useLoaderData } from "react-router-dom";
import bannerBg from "../assets/detailsbanner.png";
import PageBanner from "../components/PageBanner";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import Section from "../components/Section";
import Review from "../components/propertyDetails/Review";
import SecondaryButton from "../components/SecondaryButton";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { useState } from "react";
import CreateReview from "../components/propertyDetails/CreateReview";

const PropertyDetails = () => {
  const { data: property } = useLoaderData();
  const { savedUser } = useAuth();
  const [propertyReview, setpropertyReview] = useState({});
  const axiosSecure = useAxiosSecure();
  const {
    title,
    location,
    image,
    description,
    max_price,
    min_price,
    verification_status,
    agent_name,
    agent_image,
    agent_email,
    beds,
    baths,
    size,
    _id,
    reviews,
  } = property;
  // adding to wishlist
  async function handleWishList() {
    try {
      const wishlist = {
        user_id: savedUser._id,
        property_id: _id,
        title,
        image,
        location,
        agent_name,
        agent_image,
        agent_email,
        verification_status,
        min_price,
        max_price,
        size,
      };
      await axiosSecure.post("/wishlists", wishlist);
      toast.success(`${title} added to your wishlist.`);
    } catch (err) {
      console.log(err);
    }
  }
  // show review modal
  function handleReview() {
    setpropertyReview(property);
    document.getElementById("review-modal").showModal();
  }
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
              {verification_status && (
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs uppercase font-semibold">
                  {verification_status}
                </span>
              )}
              <span className="bg-yellow-400 text-white px-3 py-1 rounded-full text-xs uppercase font-semibold">
                Agent Name: {agent_name}
              </span>
            </div>
            <h1 className="text-3xl font-bold mt-4">{title}</h1>
            <p className="text-gray-600">
              <i className="fas fa-map-marker-alt"></i> {location}
            </p>
            <p className="mt-4 text-gray-700">{description}</p>
            <div className="flex items-center mt-4">
              <FaBed className="text-gray-600 w-5 h-5 mr-2" />
              <span className="mr-4">{beds} Beds</span>
              <FaBath className="text-gray-600 w-5 h-5 mr-2" />
              <span className="mr-4">{baths}Baths</span>
              <FaRulerCombined className="text-gray-600 w-5 h-5 mr-2" />
              <span>350 sqft</span>
            </div>
            <p className="text-2xl font-bold text-red-600 my-4">
              ${min_price} - ${max_price}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <SecondaryButton
                onClick={handleWishList}
                name="Add to wishlist"
              />
              <SecondaryButton onClick={handleReview} name="Add a review" />
            </div>
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
      {/* Review add modal  */}
      <dialog id="review-modal" className="modal">
        <div className="modal-box h-full md:h-1/2 rounded-lg flex flex-col justify-center items-center">
          <CreateReview propertyReview={propertyReview} />
        </div>
      </dialog>
    </div>
  );
};

export default PropertyDetails;
