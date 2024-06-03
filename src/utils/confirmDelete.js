import Swal from "sweetalert2";
async function confirmDelete() {
  const result = await Swal.fire({
    title: "Sure to delete?",
    text: "You cannot get it back again!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "I am sure, delete it!",
  });
  return result;
}
export default confirmDelete;

// this function returns result with isConfirmed=true/false
