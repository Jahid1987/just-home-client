const PrimaryButton = ({ name }) => {
  return (
    <button className="btn btn-sm md:btn-md  btn-outline btn-neutral text-white font-light">
      {name}
    </button>
  );
};

export default PrimaryButton;
