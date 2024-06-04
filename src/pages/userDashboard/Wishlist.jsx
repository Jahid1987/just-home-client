import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaTrash } from "react-icons/fa";
import confirmDelete from "../../utils/confirmDelete";
import deleteMessage from "../../utils/deleteMessage";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const axiosSecure = useAxiosSecure();
  // fetching data
  const {
    data: wishlists = [],
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["wishlists"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/wishlists");
      return data;
    },
  });

  // handle remove item
  async function handleRemove(id) {
    const result = await confirmDelete();
    if (!result.isConfirmed) return;
    await axiosSecure.delete(`/wishlists/${id}`);
    await refetch();
    deleteMessage();
  }
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Items not found.</p>;
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Image</th>
              <th>Agent</th>
              <th>Price Range</th>
              <th>Make Offer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {wishlists.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-16 h-16">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.title}</div>
                      <div className="text-sm opacity-50">{item.location}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-16 h-16">
                        <img
                          src={item.agent_image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.agent_name}</div>
                      <div className="text-sm opacity-50">
                        {item.verification_status}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  ${item.min_price} - ${item.max_price}
                </td>
                <td>
                  <Link to={`makeoffer/${item._id}`}>
                    <span className="badge badge-success">Offer</span>
                  </Link>
                </td>
                <th>
                  <span
                    onClick={() => handleRemove(item._id)}
                    className="badge badge-error text-white"
                  >
                    <FaTrash />
                  </span>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Wishlist;
