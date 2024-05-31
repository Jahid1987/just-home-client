import { useLoaderData } from "react-router-dom";
import bannerBg from "../assets/justbanner.png";
import PageBanner from "../components/PageBanner";

const PropertyDetails = () => {
  const { data: property } = useLoaderData();
  return (
    <div>
      <PageBanner
        bannerBg={bannerBg}
        headline="Details Of"
        text={property.title}
      />
      {property.title}
    </div>
  );
};

export default PropertyDetails;
