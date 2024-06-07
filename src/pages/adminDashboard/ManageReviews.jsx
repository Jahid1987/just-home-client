import { useQuery } from "@tanstack/react-query";
import useSecureCRUD from "../../hooks/useSecureCRUD";
import { toast } from "react-toastify";
import confirmDelete from "../../utils/confirmDelete";
import deleteMessage from "../../utils/deleteMessage";

const ManageReviews = () => {
  const { getDocs, deleteDoc } = useSecureCRUD();

  const {
    data: reviews = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => await getDocs(`/reviews`),
  });
  console.log(reviews);

  // deleting the user
  async function handleDelete(item) {
    try {
      const res = await confirmDelete();
      if (!res.isConfirmed) return;
      await deleteDoc(`/reviews/${item._id}`);
      await refetch();
      deleteMessage();
      toast.success("User Deleted");
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
        All Reviews {reviews.length}
      </h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Reviewer Details</th>
              <th>Comment</th>
              <th>Delete Review</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {reviews.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  {
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-square w-16 h-16">
                          <img
                            src={item?.reviewer_image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item?.reviewer_name}</div>
                        <div className="text-sm opacity-50">
                          Email: {item?.reviewr_email}
                        </div>
                      </div>
                    </div>
                  }
                </td>
                <td>{item.comment}</td>

                <td>
                  <span
                    onClick={() => handleDelete(item)}
                    className="badge badge-error"
                  >
                    Delete
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

export default ManageReviews;
