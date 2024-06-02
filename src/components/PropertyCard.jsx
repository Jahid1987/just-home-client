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
        {property.verification_status && (
          <div className="badge badge-success gap-2 absolute top-2 right-2">
            {verification_status}
          </div>
        )}
        {/* displaying agent from all properties page  */}
        {property.agent_name && (
          <div className="absolute bottom-0 left-0 flex items-end  rounded-tr-lg">
            <div className="avatar ">
              <div className="w-16 bg-white rounded-tr-md">
                <img
                  src={property.agent_image}
                  alt="Tailwind-CSS-Avatar-component"
                />
              </div>
            </div>
            <div className="badge -ml-3">
              <p className="ml-2">
                {property.agent_name}, <small>Agent</small>
              </p>
            </div>
          </div>
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="font-bold flex items-center">
          <CiLocationOn className="inline mr-2 text-lg" />
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
