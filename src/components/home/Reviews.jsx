import { useState } from "react";
import Section from "../Section";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../../hooks/useAxiosPublic";
const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: testimonials = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/reviews");
      console.log(data);
      return data;
    },
  });
  const handlePrev = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? testimonials.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const isLastSlide = currentIndex === testimonials.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  return (
    <Section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="text-[#1A1A1A] space-y-3 ">
          <h3 className="text-2xl md:text-3xl">
            What our customers are saying us?
          </h3>
          <p>
            Various versions have evolved over the years, sometimes by accident,
            sometimes on purpose injected humour and the like.
          </p>
          <div className="flex gap-5 items-center">
            <div className="space-y-2">
              <h3 className="text-lg md:text-xl font-medium">10m+</h3>
              <p>Happy People</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg md:text-xl font-medium">4.88</h3>
              <p>Overall rating</p>
            </div>
          </div>
        </div>
        <div className="w-full ">
          <div className="p-5  rounded-lg bg-white">
            <div className="flex justify-between">
              <div className="flex items-center gap-2 text-[#1A1A1A]">
                <img
                  src={testimonials[currentIndex]?.user_image}
                  alt={testimonials[currentIndex]?.user_name}
                  className="w-24 h-24 rounded-full object-cover mb-3"
                />
                <h3 className=" text-xl font-medium mt-3">
                  {testimonials[currentIndex]?.user_name}
                </h3>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="46"
                height="45"
                viewBox="0 0 46 45"
                fill="none"
              >
                <g clipPath="url(#clip0_2_244)">
                  <path
                    d="M10.0688 38.9404C7.03235 38.9404 4.66008 37.8928 2.95205 35.7975C1.24403 33.6071 0.390015 30.369 0.390015 26.0833C0.390015 21.6071 1.38636 17.3214 3.37906 13.2261C5.46665 9.13091 8.40826 5.08329 12.2039 1.08329C12.2988 0.988051 12.4411 0.94043 12.6309 0.94043C12.9155 0.94043 13.1053 1.08329 13.2002 1.369C13.39 1.55948 13.4374 1.79757 13.3426 2.08329C11.0652 5.13091 9.4995 8.08329 8.64549 10.9404C7.88636 13.7023 7.5068 16.7975 7.5068 20.2261C7.5068 22.7975 7.83892 24.7975 8.50315 26.2261C9.16739 27.6547 10.0688 28.9404 11.2075 30.0833L5.79877 31.0833C5.70388 29.4642 6.13089 28.2261 7.07979 27.369C8.12359 26.5118 9.45207 26.0833 11.0652 26.0833C13.0579 26.0833 14.5761 26.6547 15.6199 27.7975C16.7586 28.9404 17.328 30.5118 17.328 32.5118C17.328 34.6071 16.6637 36.2261 15.3353 37.369C14.1017 38.4166 12.3462 38.9404 10.0688 38.9404ZM31.9885 38.9404C28.952 38.9404 26.5798 37.8928 24.8718 35.7975C23.2586 33.6071 22.452 30.369 22.452 26.0833C22.452 21.5118 23.4484 17.1785 25.4411 13.0833C27.4338 8.98805 30.3754 4.98805 34.2659 1.08329C34.3608 0.988051 34.5031 0.94043 34.6929 0.94043C34.9776 0.94043 35.1674 1.08329 35.2623 1.369C35.452 1.55948 35.4995 1.79757 35.4046 2.08329C33.1272 5.13091 31.5615 8.08329 30.7075 10.9404C29.9484 13.7023 29.5688 16.7975 29.5688 20.2261C29.5688 22.7975 29.8535 24.8452 30.4228 26.369C31.0871 27.7975 31.9885 29.0356 33.1272 30.0833L27.8608 31.0833C27.7659 29.4642 28.1929 28.2261 29.1418 27.369C30.0907 26.5118 31.4192 26.0833 33.1272 26.0833C35.1199 26.0833 36.6382 26.6547 37.682 27.7975C38.8207 28.9404 39.39 30.5118 39.39 32.5118C39.39 34.6071 38.7258 36.2261 37.3973 37.369C36.1637 38.4166 34.3608 38.9404 31.9885 38.9404Z"
                    fill="#1A1A1A"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2_244">
                    <rect
                      width="45"
                      height="44"
                      fill="white"
                      transform="translate(0.390015 0.94043)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <p className="text-lg mb-2">
              {testimonials[currentIndex]?.property_title}
            </p>
            <blockquote>{testimonials[currentIndex]?.comment}</blockquote>
          </div>
          <div className="flex gap-4 ml-5">
            <button
              className="btn btn-sm rounded-full px-5 text-xl font-light"
              onClick={handlePrev}
            >
              {"<"}
            </button>
            <button
              className="btn btn-sm rounded-full px-5 text-xl font-light"
              onClick={handleNext}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Reviews;
