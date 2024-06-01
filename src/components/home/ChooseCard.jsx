const ChooseCard = ({ image, title, text }) => {
  return (
    <div className="grid place-items-center text-center space-y-3">
      <img src={image} alt={title} />
      <h3 className="font-bold text-base md:text-lg">{title}</h3>
      <p className="text-gray-500">{text}</p>
    </div>
  );
};

export default ChooseCard;
