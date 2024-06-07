import PageBanner from "../components/PageBanner";
import bannerbg from "../assets/allpropertiesbg.png";
import Section from "../components/Section";
import SearchFilter from "../components/AllProperties/SearchFilter";
const Properties = () => {
  return (
    <div>
      <PageBanner
        bannerBg={bannerbg}
        headline="All Properties"
        text="Easily Find Your's One"
        textcolor="text-black"
      ></PageBanner>
      <Section sectionhead="Find The Best Deal">
        <SearchFilter />
      </Section>
    </div>
  );
};

export default Properties;
