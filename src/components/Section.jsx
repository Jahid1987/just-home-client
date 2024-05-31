const Section = ({ children, sectionhead, sectiontext }) => {
  return (
    <section className="w-full md:w-11/12 xl:w-10/12 mx-auto my-5 md:my-10 lg:my-16">
      <div className="text-center text-[#1A1A1A] mb-5 md:mb-7 space-y-2">
        <h3 className="text-2xl md:text-3xl lg:text-5xl font-medium">
          {sectionhead}
        </h3>
        <p className="text-sm md:text-base">{sectiontext}</p>
      </div>
      {/* all data will be shown here from parent component as children  */}
      {children}
    </section>
  );
};

export default Section;
