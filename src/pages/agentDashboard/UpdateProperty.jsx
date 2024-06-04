import { useForm } from "react-hook-form";
import SecondaryButton from "../../components/SecondaryButton";
import useAuth from "../../hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import useUploadImage from "../../hooks/useUploadImage";
import { toast } from "react-toastify";
import { useState } from "react";
import useSecureCRUD from "../../hooks/useSecureCRUD";
import { useParams } from "react-router-dom";

const UpdateProperty = () => {
  const { savedUser } = useAuth();
  const uploadImage = useUploadImage();
  const { updateDoc, getDoc } = useSecureCRUD();
  const [isUpdating, setisUpdating] = useState(false);
  const { id } = useParams();

  // access client
  const queryClient = useQueryClient();
  // mutaions
  const { mutateAsync } = useMutation({
    mutationFn: async (updatedDoc) =>
      await updateDoc(`/properties/${id}`, updatedDoc),
    onSuccess: () => {
      queryClient.invalidateQueries("properties");
    },
  });

  const {
    data: property = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["property"],
    queryFn: () => getDoc(`/properties/${id}`),
  });
  // console.log(property);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // handle adding property
  async function handleUpdateProperty(data) {
    const { baths, beds, max_price, min_price, size, image, ...rest } = data;

    try {
      setisUpdating(true);
      // uploading image to imagebb
      const imageFile = { image: image[0] };
      const { success, display_url: photoURL } = await uploadImage(imageFile);
      if (!success) {
        setisUpdating(false);
        return toast.error("Cannot upload Image");
      }

      const property = {
        baths: parseInt(baths),
        beds: parseInt(beds),
        max_price: parseInt(max_price),
        min_price: parseInt(min_price),
        size: parseInt(size),
        image: photoURL,
        ...rest,
        updated_at: new Date(),
      };
      console.log(property);
      await mutateAsync(property);
      setisUpdating(false);
      toast.success("Property Updated Successfully");
    } catch (err) {
      console.log(err);
      toast.error("Could not update item");
      setisUpdating(false);
    }
  }
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Properties not found.</p>;
  return (
    <div className="card shrink-0 w-full border-separate">
      <h3 className="text-xl md:text-2xl lg:text-3xl text-center my-3 md:my-5">
        Update Property
      </h3>
      <form onSubmit={handleSubmit(handleUpdateProperty)} className="card-body">
        {/* row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
              {errors.title?.type === "required" && (
                <span className="label-text text-red-600">
                  Title field is required
                </span>
              )}
            </label>
            <input
              {...register("title", { required: true })}
              type="text"
              placeholder="title"
              className="input input-bordered"
              defaultValue={property?.title}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Location</span>
              {errors.location?.type === "required" && (
                <span className="label-text text-red-600">
                  Location field is required
                </span>
              )}
            </label>
            <input
              {...register("location", { required: true })}
              type="text"
              placeholder="location"
              className="input input-bordered"
              defaultValue={property?.location}
            />
          </div>
        </div>
        {/* row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Agent Name</span>
            </label>
            <input
              type="text"
              defaultValue={savedUser.name}
              className="input input-bordered"
              readOnly
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Agent Email</span>
            </label>
            <input
              type="email"
              defaultValue={savedUser.email}
              className="input input-bordered"
              readOnly
            />
          </div>
        </div>
        {/* row 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="form-control lg:col-span-1">
            <label className="label">
              <span className="label-text">Property Image</span>
              {errors.image?.type === "required" && (
                <span className="label-text text-red-600">
                  Image field is required
                </span>
              )}
            </label>
            <input {...register("image", { required: true })} type="file" />
          </div>
          <div className="lg:col-span-2 lg:grid lg:grid-cols-2 gap-3">
            <div className="form-control ">
              <label className="label">
                <span className="label-text">Minimum Price</span>
                {errors.min_price?.type === "required" && (
                  <span className="label-text text-red-600">
                    This field is required
                  </span>
                )}
              </label>
              <input
                {...register("min_price", { required: true })}
                type="number"
                placeholder="Minimum Price"
                className="input input-bordered"
                defaultValue={property?.min_price}
              />
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-text">Maximum Price</span>
                {errors.max_price?.type === "required" && (
                  <span className="label-text text-red-600">
                    This field is required
                  </span>
                )}
              </label>
              <input
                {...register("max_price", { required: true })}
                type="number"
                placeholder="Maximum Price"
                className="input input-bordered"
                defaultValue={property?.max_price}
              />
            </div>
          </div>
        </div>
        {/* row 4 */}
        <div className="grid grid-cols-3 gap-2">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Beds</span>
            </label>
            <input
              {...register("beds")}
              type="number"
              placeholder="title"
              className="input input-bordered"
              defaultValue={property?.beds}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Baths</span>
            </label>
            <input
              {...register("baths", { required: true })}
              type="number"
              placeholder="baths"
              className="input input-bordered"
              defaultValue={property?.baths}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Size</span>
            </label>
            <input
              {...register("size", { required: true })}
              type="number"
              placeholder="size"
              className="input input-bordered"
              defaultValue={property?.size}
            />
          </div>
        </div>
        {/* row 5 */}

        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
            {errors.description?.type === "required" && (
              <span className="label-text text-red-600">
                Title field is required
              </span>
            )}
          </label>
          <textarea
            {...register("description", { required: true })}
            placeholder="Description"
            className="textarea textarea-bordered textarea-lg w-full "
            defaultValue={property?.description}
          ></textarea>
        </div>
        <div className="form-control mt-6">
          <SecondaryButton isPending={isUpdating} name="Update Property" />
        </div>
      </form>
    </div>
  );
};

export default UpdateProperty;
