import Nav from "./Nav";

const Banner = ({ children, banner }) => {
  return (
    <div
      style={{
        borderRadius: "24px",
        background: `url(${banner}) lightgray 0px -0.6px / 100% 100.14% no-repeat`,
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
