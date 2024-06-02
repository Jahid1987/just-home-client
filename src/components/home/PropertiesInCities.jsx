import { useQuery } from "@tanstack/react-query";
import Section from "../Section";
import { axiosPublic } from "../../hooks/useAxiosPublic";
import CityCard from "./CityCard";

const PropertiesInCities = () => {
  const { data: cities = [] } = useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const { data } = await axiosPublic("/cities");
      return data;
    },
  });
  return (
    <Section
      sectionhead="Find Properties in These Cities"
      sectiontext="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    >
      <div className="grid gap-3 grid-cols-1 md:grid-cols-4">
        {cities.map((city, index) => (
          <CityCard key={city._id} city={city} index={index} />
        ))}
      </div>
    </Section>
  );
};

export default PropertiesInCities;
