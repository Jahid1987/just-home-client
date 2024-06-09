import { useQuery } from "@tanstack/react-query";
import useSecureCRUD from "../../hooks/useSecureCRUD";
import { toast } from "react-toastify";

const AdvertiseProperties = () => {
  const { getDocs, createDoc } = useSecureCRUD();

  const {
    data: properties = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: async () =>
      await getDocs(`/properties?verification_status=verified`),
  });
  // handle status
  async function handleAdvertise(item, status) {
    try {
      const updatedDoc = {
        id: item._id,
        status,
      };
      console.log(updatedDoc);
      await createDoc("/properties/advertise", updatedDoc);
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
              <th>Price Range</th>
              <th>Agent Name</th>
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

                <td>
                  {item?.min_price} - {item?.max_price}
                </td>
                <td>{item?.agent_name}</td>
                <td className="space-y-3 text-center">
                  {item?.advertiesment_status ? (
                    <span
                      onClick={() => handleAdvertise(item, false)}
                      className="badge cursor-pointer badge-success"
                    >
                      Remove
                    </span>
                  ) : (
                    <span
                      onClick={() => handleAdvertise(item, true)}
                      className="badge cursor-pointer badge-success"
                    >
                      Add
                    </span>
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

export default AdvertiseProperties;
