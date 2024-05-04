import Swal from "sweetalert2";

export default function Alert(displayIcon, response, responseText) {
  Swal.fire({
    icon: displayIcon,
    title: response,
    text: responseText,
    background: "#121212",
    confirmButtonColor: "#e50914",
    iconColor: "#e50914",
    customClass: {
      title: "text-white",
      content: "text-white",
      confirmButton: "bg-red-700 text-white",
    },
    backdrop: "rgba(0, 0, 0, 0.8)",
  });
}
