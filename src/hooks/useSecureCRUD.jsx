import useAxiosSecure from "./useAxiosSecure";

const useSecureCRUD = () => {
  const axiosSecure = useAxiosSecure();
  //   reading docs
  async function getDocs(endPoint) {
    const { data } = await axiosSecure.get(endPoint);
    return data;
  }
  // creating doc
  async function createDoc(endPoint) {
    console.log(endPoint);
  }
  // delete doc
  async function deleteDoc(endPoint) {
    const { data } = await axiosSecure.delete(endPoint);
    return data;
  }
  return { getDocs, createDoc, deleteDoc };
};

export default useSecureCRUD;
