const SecondaryButton = ({ name, onClick, isPending }) => {
  return (
    <button
      onClick={onClick}
      className="btn btn-sm md:btn-md  btn-outline w-full btn-warning text-white font-light"
    >
      {isPending ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        name
      )}
    </button>
  );
};

export default SecondaryButton;
