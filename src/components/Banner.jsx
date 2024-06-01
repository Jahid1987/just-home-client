import Nav from "./Nav";

const Banner = ({ children, banner }) => {
  return (
    <div
      style={{
        borderRadius: "24px",
        background: `linear-gradient(180deg, rgba(26, 26, 26, 0.80) 0%, rgba(26, 26, 26, 0.10) 60%, rgba(0, 0, 0, 0.00) 100%), 
        url(${banner}) lightgray 0px -0.6px / 100% 100.14% no-repeat`,
      }}
    >
      <Nav />
      <div className="grid place-items-center h-full py-8 md:py-10 lg:py-16">
        {children}
      </div>
    </div>
  );
};

export default Banner;
