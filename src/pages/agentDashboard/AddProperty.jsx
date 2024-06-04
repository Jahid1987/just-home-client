import { useForm } from "react-hook-form";
import SecondaryButton from "../../components/SecondaryButton";
import useAuth from "../../hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUploadImage from "../../hooks/useUploadImage";
import { toast } from "react-toastify";
import { useState } from "react";

const AddProperty = () => {
  const { savedUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const uploadImage = useUploadImage();
  const [isCreating, setisCreating] = useState(false);
  // access client
  const queryClient = useQueryClient();
  // mutaions
  const { mutateAsync } = useMutation({
    mutationFn: (newDoc) => {
      const { data } = axiosSecure.post("/properties", newDoc);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("properties");
      console.log(data);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // handle adding property
  async function handleAddProperty(data) {
    const { baths, beds, max_price, min_price, size, image, ...rest } = data;

    try {
      setisCreating(true);
      // uploading image to imagebb
      const imageFile = { image: image[0] };
      const response = await uploadImage(imageFile);
      if (!response.data.success) return toast.error("Cannot upload Image");
      const photoURL = response.data.data.display_url;
      const property = {
        baths: parseInt(baths),
        beds: parseInt(beds),
        max_price: parseInt(max_price),
        min_price: parseInt(min_price),
        size: parseInt(size),
        image: photoURL,
        ...rest,
        agent_name: savedUser?.name,
        agent_email: savedUser?.email,
        agent_image: savedUser?.image,
        created_at: new Date(),
        verification_status: "unverified",
      };
      console.log(property);
      await mutateAsync(property);
      setisCreating(false);
      toast.success("Property Added Successfully");
    } catch (err) {
      console.log(err);
      setisCreating(false);
    }
  }
  return (
    <div className="card shrink-0 w-full border-separate">
      <h3 className="text-xl md:text-2xl lg:text-3xl text-center my-3 md:my-5">
        Add Property
      </h3>
      <form onSubmit={handleSubmit(handleAddProperty)} className="card-body">
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
          ></textarea>
        </div>
        <div className="form-control mt-6">
          <SecondaryButton isPending={isCreating} name="Add Property" />
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
