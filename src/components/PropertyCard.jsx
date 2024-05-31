import { CiLocationOn } from "react-icons/ci";

import SecondaryButton from "./SecondaryButton";
const PropertyCard = ({ property }) => {
  const { image, title, price_range, verification_status, location } = property;
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure className="relative">
        <img src={image} alt={title} />
        <div className="badge badge-success gap-2 absolute top-2 right-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-4 h-4 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
          {verification_status}
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="font-bold">
          <CiLocationOn className="inline mr-2" />
          {location}
        </p>
        <p className="text-gray-500 text-lg">
          Price: ${price_range[0]} - ${price_range[1]}
        </p>
        <SecondaryButton name="Details" />
      </div>
    </div>
  );
};

export default PropertyCard;
