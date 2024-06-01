import PageBanner from "../components/PageBanner";
import bannerbg from "../assets/allpropertiesbg.png";
import Section from "../components/Section";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../hooks/useAxiosPublic";
import PropertyCard from "../components/PropertyCard";
const Properties = () => {
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["allproperties"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/allproperties");
      return data;
    },
  });
  return (
    <div>
      <PageBanner
        bannerBg={bannerbg}
        headline="All Properties"
        text="Easily Find Your's One"
        textcolor="text-black"
      ></PageBanner>
      <Section sectionhead="Find The Best Deal">
        {/* showing all properties  */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5 lg:gap-8">
          {isLoading ? (
            <p>Loading ...</p>
          ) : (
            properties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                agent={true}
              ></PropertyCard>
            ))
          )}
        </div>
      </Section>
    </div>
  );
};

export default Properties;
