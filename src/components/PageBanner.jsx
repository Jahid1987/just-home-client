import Banner from "./Banner";
const PageBanner = ({ bannerBg, headline, text }) => {
  return (
    <Banner banner={bannerBg}>
      <div className="text-center w-11/12 md:w-6/12 lg:w-5/12 space-y-3">
        <h1 className="text-2xl md:text-3xl lg:text-5xl text-white ">
          {headline}
        </h1>
        <p className="text-base md:text-lg lg:text-xl font-thin text-white">
          {text}
        </p>
      </div>
    </Banner>
  );
};

export default PageBanner;
