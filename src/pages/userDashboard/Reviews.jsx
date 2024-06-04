import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useSecureCRUD from "../../hooks/useSecureCRUD";
import useAuth from "../../hooks/useAuth";
import { FaTrash } from "react-icons/fa";
import confirmDelete from "../../utils/confirmDelete";
import deleteMessage from "../../utils/deleteMessage";

const Reviews = () => {
  const { getDocs, deleteDoc } = useSecureCRUD();
  const { savedUser } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () =>
      await getDocs(`/reviews?reviewer_email=${savedUser.email}`),
  });

  const { mutateAsync } = useMutation({
    mutationFn: deleteDoc,
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });

  // handling delete
  async function handleDelete(id) {
    const res = await confirmDelete();
    if (!res.isConfirmed) return;
    await mutateAsync(`/reviews/${id}`);
    deleteMessage();
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Items not found.</p>;
  return (
    <div>
      <h3 className="text-xl md:text-2xl lg:text-3xl text-center mb-3 md:mb-5">
        My total reviews {reviews.length}
      </h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Property Title</th>
              <th>Agent Name</th>
              <th>Review Time</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {reviews.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item?.property_title}</td>
                <td>{item?.agent_name}</td>
                <td>{new Date(item?.created_at).toLocaleDateString()}</td>
                <td>{item?.comment}</td>
                <td>
                  <span
                    onClick={() => handleDelete(item._id)}
                    className="badge badge-error text-white"
                  >
                    <FaTrash />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reviews;
