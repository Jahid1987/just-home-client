import { useQuery } from "@tanstack/react-query";
import useSecureCRUD from "../../hooks/useSecureCRUD";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const Orders = () => {
  const { getDocs } = useSecureCRUD();
  const { savedUser } = useAuth();

  const {
    data: offers = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["offers"],
    queryFn: async () =>
      await getDocs(`/offers?buyer_email=${savedUser.email}`),
  });
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Properties not found.</p>;
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
              <th>Agent Name</th>
              <th>Offered Amount</th>
              <th>Offer Status</th>
              <th>Pay</th>
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
                <td>{item?.agent_name}</td>
                <td>{item?.offered_amount}</td>
                <td>
                  <span className="badge badge-info">{item?.status}</span>
                </td>
                <td>
                  {item?.status === "accepted" ? (
                    <Link to={`/userdashboard/payment`}>
                      <span className="badge badge-success">Pay</span>
                    </Link>
                  ) : (
                    <span className="badge text-gray-400">Waiting</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
