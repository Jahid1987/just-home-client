const CityCard = ({ city, index }) => {
  return (
    <div
      className={`${
        index === 0 || index === 5 ? "col-span-2" : ""
      } w-full h-[390px] rounded-xl`}
      style={{
        background: `linear-gradient(180deg, rgba(26, 26, 26, 0.80) 0%, rgba(26, 26, 26, 0.10) 60%, rgba(0, 0, 0, 0.00) 100%),
        url(${city.image}) no-repeat`,
        backgroundSize: `cover`,
      }}
    >
      <div className="ml-5 mt-5 text-white">
        <p className="font-light">{8 + index} Properties</p>
        <h3 className="text-xl">{city.name}</h3>
      </div>
    </div>
  );
};

export default CityCard;
