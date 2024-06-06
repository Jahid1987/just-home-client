import { useQuery } from "@tanstack/react-query";
import useSecureCRUD from "../../hooks/useSecureCRUD";
import { toast } from "react-toastify";

const ManageProperties = () => {
  const { getDocs, createDoc } = useSecureCRUD();

  const {
    data: properties = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => await getDocs(`/properties`),
  });
  // handle status
  async function handleStatus(item, status) {
    try {
      const updatedDoc = {
        id: item._id,
        status,
      };
      console.log(updatedDoc);
      await createDoc("/properties/updatestatus", updatedDoc);
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
        Total Properties {properties.length}
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
            {/* row  */}
            {properties.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
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
                      <div className="font-bold">{item?.title}</div>
                      <div className="text-sm opacity-50">{item?.location}</div>
                    </div>
                  </div>
                </td>
                <td>{item?.agent_name}</td>
                <td>{item?.agent_email}</td>
                <td>
                  {item?.min_price} - {item?.max_price}
                </td>
                <td className="space-y-3 text-center">
                  {item?.verification_status === "verified" ||
                  item?.verification_status === "rejected" ? (
                    <span
                      className={`${
                        item?.verification_status === "verified"
                          ? "badge-success"
                          : "badge-error"
                      } badge`}
                    >
                      {item?.verification_status}
                    </span>
                  ) : (
                    <>
                      <span
                        onClick={() => handleStatus(item, "verified")}
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
                    </>
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

export default ManageProperties;
