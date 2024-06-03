import { Rating } from "@smastrom/react-rating";

const Review = ({ review }) => {
  const { rating, comment, user_image, user_name } = review;
  return (
    <div className="p-5  rounded-lg bg-white">
      <div className="flex justify-between">
        <div className="flex items-center gap-2 text-[#1A1A1A]">
          <img
            src={user_image}
            alt={user_name}
            className="w-24 h-24 rounded-full object-cover mb-3"
          />
          <h3 className=" text-xl font-medium mt-3">{user_name}</h3>
        </div>
      </div>
      <Rating value={rating} style={{ maxWidth: 100 }} readOnly />
      <blockquote className="mt-3">{comment}</blockquote>
    </div>
  );
};

export default Review;
