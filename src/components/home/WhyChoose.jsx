import Section from "../Section";
import ChooseCard from "./ChooseCard";
import future from "../../assets/whychoose/future.svg";
import experienced from "../../assets/whychoose/experienced.svg";
import buy from "../../assets/whychoose/buy.svg";
import list from "../../assets/whychoose/list.svg";
const WhyChoose = () => {
  return (
    <Section
      sectionhead="Why Choose Us"
      sectiontext="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-start place-content-center gap-2 md:gap-4 px-2 md:px-0">
        <ChooseCard
          image={future}
          title="Find your future home"
          text="We help you find a new home by offering a
smart real estate experience"
        ></ChooseCard>
        <ChooseCard
          image={experienced}
          title="Experienced agents"
          text="Find an experienced agent who knows your
          market best"
        ></ChooseCard>
        <ChooseCard
          image={buy}
          title="Buy or rent homes"
          text="Millions of houses and apartments in your
          favourite cities"
        ></ChooseCard>
        <ChooseCard
          image={list}
          title="List your own property"
          text="Sign up now and sell or rent your own
          properties"
        ></ChooseCard>
      </div>
    </Section>
  );
};

export default WhyChoose;
