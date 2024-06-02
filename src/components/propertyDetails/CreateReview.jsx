import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { Rating } from "@smastrom/react-rating";
import useUser from "../../hooks/useUser";
const Review = ({ propertyReview }) => {
  const [review, seReview] = useState("");
  const [rating, setRating] = useState(0);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { getUser } = useUser();

  const { title, _id } = propertyReview;

  // handle review
  async function handleReview() {
    const { _id: userId, image: user_image, name: user_name } = await getUser();

    const userReview = {
      propertyId: _id,
      userId,
      property_title: title,
      user_name,
      user_image,
      rating,
      comment: review,
      created_at: new Date(),
    };
    console.log(userReview, user.uid);
    try {
      await axiosSecure.post(`/reviews`, userReview);
      toast.success("Thank you for your review.");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="h-full flex flex-col justify-between">
      <h3 className="font-bold text-xl md:text-2xl">
        We appritiate your review.
      </h3>

      <div className="modal-action">
        <form method="dialog" className="space-y-6">
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold">Rate our room:</p>
            <Rating
              style={{ maxWidth: 180 }}
              value={rating}
              onChange={setRating}
            />
          </div>
          <textarea
            value={review}
            onChange={(e) => seReview(e.target.value)}
            placeholder="Write your reviw"
            className="textarea textarea-bordered textarea-lg w-full"
          ></textarea>
          {/* if there is a button in form, it will close the modal */}
          <div className="space-x-10">
            <button className="btn btn-sm md:btn-md rounded-none border-none btn-error uppercase uppercas font-light">
              Cancel
            </button>
            <button
              onClick={handleReview}
              className="btn btn-sm md:btn-md rounded-none border-none bg-[#B94545] hover:bg-[#b94545e5] text-white hover:text-black uppercase uppercas font-light"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Review;
