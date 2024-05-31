import { useQuery } from "@tanstack/react-query";
import Section from "../Section";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import PropertyCard from "../PropertyCard";

const Advertisement = () => {
  const axiosPublic = useAxiosPublic();

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/properties");
      console.log(data);
      return data;
    },
  });
  return (
    <Section
      sectionhead="Homes For You"
      sectiontext="Based on your view history"
    >
      {/* all advertised properties  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 lg:gap-8">
        {isLoading ? (
          <p>Loading ...</p>
        ) : (
          properties.map((property) => (
            <PropertyCard key={property._id} property={property}></PropertyCard>
          ))
        )}
      </div>
    </Section>
  );
};

export default Advertisement;
