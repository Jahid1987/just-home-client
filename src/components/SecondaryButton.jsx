const SecondaryButton = ({ name, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="btn btn-sm md:btn-md  btn-outline w-full btn-warning text-white font-light"
    >
      {name}
    </button>
  );
};

export default SecondaryButton;
