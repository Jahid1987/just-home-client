import useAxiosSecure from "./useAxiosSecure";

const useSecureCRUD = () => {
  const axiosSecure = useAxiosSecure();
  //   reading docs
  async function getDocs(endPoint) {
    const { data } = await axiosSecure.get(endPoint);
    return data;
  }
  // reading single doc
  async function getDoc(endPoint) {
    const { data } = await axiosSecure.get(endPoint);
    return data;
  }
  // creating doc
  async function createDoc(endPoint, doc) {
    const { data } = await axiosSecure.post(endPoint, doc);
    return data;
  }
  // update doc
  async function updateDoc(endPoint, updatedDoc) {
    const { data } = await axiosSecure.patch(endPoint, updatedDoc);
    return data;
  }
  // delete doc
  async function deleteDoc(endPoint) {
    const { data } = await axiosSecure.delete(endPoint);
    return data;
  }
  return { getDocs, createDoc, deleteDoc, getDoc, updateDoc };
};

export default useSecureCRUD;
