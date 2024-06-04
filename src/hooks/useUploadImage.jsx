import { axiosPublic } from "./useAxiosPublic";
const image_hosting_key = import.meta.env.VITE_image_api_key;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const useUploadImage = () => {
  async function uploadImage(imageFile) {
    try {
      const response = await axiosPublic.post(image_upload_api, imageFile, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response?.data.success) {
        return { success: true, display_url: response.data.data.display_url };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  return uploadImage;
};

export default useUploadImage;
