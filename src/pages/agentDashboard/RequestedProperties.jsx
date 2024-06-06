import { useQuery } from "@tanstack/react-query";
import useSecureCRUD from "../../hooks/useSecureCRUD";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const RequestedProperties = () => {
  const { getDocs, updateDoc } = useSecureCRUD();
  const { savedUser } = useAuth();

  const {
    data: offers = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["offers"],
    queryFn: async () =>
      await getDocs(`/offers?agent_email=${savedUser.email}`),
  });

  async function handleStatus(item, status) {
    try {
      const updatedDoc = {
        property_id: item.property_id, // this id for updating others offer status to rejected
        status,
      };
      await updateDoc(`/offers/${item._id}`, updatedDoc);
      await refetch();
      toast.success("Status updated");
    } catch (err) {
      toast.error("Something wrong!");
      console.log(err);
    }
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Items not found.</p>;
  return (
    <div>
      <h3 className="text-xl md:text-2xl lg:text-3xl text-center mb-3 md:mb-5">
        Your Offered Properties {offers.length}
      </h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Property Details</th>
              <th>Buyer Email</th>
              <th>Buyer Name</th>
              <th>Offered Amount</th>
              <th>Actions/Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {offers.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-square w-16 h-16">
                        <img
                          src={item?.property_image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item?.property_title}</div>
                      <div className="text-sm opacity-50">
                        {item?.property_location}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item?.buyer_email}</td>
                <td>{item?.buyer_name}</td>
                <td>{item?.offered_amount}</td>
                {item?.status !== "pending" ? (
                  <td className="text-center">
                    <span
                      className={`badge ${
                        item?.status === "accepted"
                          ? "badge-info"
                          : "badge-warning"
                      }`}
                    >
                      {item?.status}
                    </span>
                  </td>
                ) : (
                  <td className="space-y-3 text-center">
                    <span
                      onClick={() => handleStatus(item, "accepted")}
                      className="badge cursor-pointer badge-success"
                    >
                      Accept
                    </span>
                    <span
                      onClick={() => handleStatus(item, "rejected")}
                      className="badge cursor-pointer badge-error"
                    >
                      Reject
                    </span>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedProperties;
