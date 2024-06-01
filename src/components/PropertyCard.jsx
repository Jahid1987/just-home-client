import { CiLocationOn } from "react-icons/ci";

import SecondaryButton from "./SecondaryButton";
import { Link } from "react-router-dom";
const PropertyCard = ({ property }) => {
  const { image, title, price_range, verification_status, location, _id } =
    property;
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure className="relative">
        <div className="h-[290px] w-full">
          <img className="h-full w-full object-cover" src={image} alt={title} />
        </div>
        <div className="badge badge-success gap-2 absolute top-2 right-2">
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
        <Link className="w-full" to={`/propertydetails/${_id}`}>
          <SecondaryButton name="Details" />
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
