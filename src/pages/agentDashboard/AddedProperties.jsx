import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useSecureCRUD from "../../hooks/useSecureCRUD";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import confirmDelete from "../../utils/confirmDelete";
import deleteMessage from "../../utils/deleteMessage";

const AddedProperties = () => {
  const { getDocs, deleteDoc } = useSecureCRUD();
  const { savedUser } = useAuth();
  const queryClient = useQueryClient();

  // reading data based on agent eamil
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: async () =>
      await getDocs(`/properties?agent_email=${savedUser.email}`),
  });
  // deleting data based on id
  const { mutateAsync } = useMutation({
    mutationFn: deleteDoc,
    onSuccess: () => queryClient.invalidateQueries(["properties"]),
  });
  async function handleDelete(id) {
    const res = await confirmDelete();
    if (!res.isConfirmed) return;
    await mutateAsync(`/properties/${id}`);
    deleteMessage();
  }
  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Property Details</th>
              <th>Agent Details</th>
              <th>Price Range</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {properties.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-square w-16 h-16">
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
                    <span className="badge badge-success">Update</span>
                  </Link>
                </td>
                <th>
                  <span
                    onClick={() => handleDelete(item._id)}
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

export default AddedProperties;
