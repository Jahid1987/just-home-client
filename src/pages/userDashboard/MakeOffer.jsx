import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import SecondaryButton from "../../components/SecondaryButton";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const MakeOffer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const { savedUser } = useAuth();
  const { id } = useParams();
  const { data: property = {} } = useQuery({
    queryKey: ["wishlistProperty"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/wishlists/${id}`);
      console.log(data.price_range);
      return data;
    },
  });

  const handleMakeOffer = async (data) => {
    console.log(errors);
    try {
      const offer = {
        property_title: property?.title,
        property_location: property?.location,
        agent_name: property?.agent_name,
        offered_amount: data.offeredAmount,
        buyer_email: savedUser.email,
        buyer_name: savedUser.name,
        buying_date: new Date(),
      };
      console.log(offer);
      // await axiosSecure.post("/offers", offer);
      toast.success("Offer Made to the agent");
    } catch (error) {
      console.error("Error submitting offer:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-bold mb-6">Submit an Offer</h2>
      <form onSubmit={handleSubmit(handleMakeOffer)} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Property Title</span>
          </label>
          <input
            type="text"
            name="propertyTitle"
            value={property?.title}
            readOnly
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Property Location</span>
          </label>
          <input
            type="text"
            name="propertyLocation"
            value={property?.location}
            readOnly
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Agent Name</span>
          </label>
          <input
            type="text"
            name="agentName"
            value={property?.agent_name}
            readOnly
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Offered Amount</span>
            <span className="label-text">
              {errors.offeredAmount && (
                <span>
                  {errors.offeredAmount.type === "min" &&
                    "Amount must be at least 10"}
                  {errors.offeredAmount.type === "max" &&
                    "Amount must be at most 15"}
                  {errors.offeredAmount.type === "required" &&
                    "Amount is required"}
                </span>
              )}
            </span>
          </label>
          <input
            type="number"
            name="offeredAmount"
            className="input input-bordered w-full"
            {...register("offeredAmount", {
              required: true,
              min: property.price_range[0],
              max: property.price_range[1],
            })}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Buyer Email</span>
          </label>
          <input
            type="email"
            name="buyerEmail"
            value={savedUser?.email}
            readOnly
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Buyer Name</span>
          </label>
          <input
            type="text"
            name="buyerName"
            value={savedUser?.name}
            readOnly
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <SecondaryButton name="Make Offer" />
        </div>
      </form>
    </div>
  );
};

export default MakeOffer;
