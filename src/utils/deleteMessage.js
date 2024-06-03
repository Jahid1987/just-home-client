import Swal from "sweetalert2";
function deleteMessage() {
  Swal.fire({
    title: "Deleted!",
    text: "Your file has been deleted.",
    icon: "success",
  });
}
export default deleteMessage;
