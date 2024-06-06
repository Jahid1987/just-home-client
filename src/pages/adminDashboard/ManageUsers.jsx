import { useQuery } from "@tanstack/react-query";
import useSecureCRUD from "../../hooks/useSecureCRUD";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const { getDocs, updateDoc, deleteDoc } = useSecureCRUD();

  const {
    data: users = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => await getDocs(`/users`),
  });
  // setting the role of user
  async function handleRole(item, role) {
    try {
      const updatedDoc = { role, email: item.email };
      console.log(updatedDoc);
      await updateDoc(`/users/${item._id}`, updatedDoc);
      await refetch();
      toast.success("Role updated");
    } catch (err) {
      toast.error("Something wrong!");
      console.log(err);
    }
  }
  // deleting the user
  async function handleDelete(item) {
    try {
      await deleteDoc(`/users/${item._id}`);
      await refetch();
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
        All Users {users.length}
      </h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>User Details</th>
              <th>Make Admin</th>
              <th>Make Agent</th>
              <th>Mark as Fraud</th>
              <th>Delete User</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  {
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-square w-16 h-16">
                          <img
                            src={item?.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item?.name}</div>
                        <div className="text-sm opacity-50">
                          Email: {item?.email}
                        </div>
                        <div className="text-sm">Role: {item?.role}</div>
                      </div>
                    </div>
                  }
                </td>
                <td>
                  {item.role === "admin" ? (
                    <span>Admin</span>
                  ) : (
                    <span
                      onClick={() => handleRole(item, "admin")}
                      className="badge badge-success"
                    >
                      Make Admin
                    </span>
                  )}
                </td>
                <td>
                  {item.role === "agent" ? (
                    <p>Agent</p>
                  ) : (
                    <span
                      onClick={() => handleRole(item, "agent")}
                      className="badge badge-info"
                    >
                      Make Agent
                    </span>
                  )}
                </td>
                <td>
                  {item?.role === "fraud" ? (
                    <span>Fraud</span>
                  ) : (
                    <span
                      onClick={() => handleRole(item, "fraud")}
                      className="badge badge-warning"
                    >
                      Mark Fraud
                    </span>
                  )}
                </td>
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

export default ManageUsers;
