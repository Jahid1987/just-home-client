const SecondaryButton = ({ name }) => {
  return (
    <button className="btn btn-sm md:btn-md  btn-outline w-full btn-warning text-white font-light">
      {name}
    </button>
  );
};

export default SecondaryButton;
