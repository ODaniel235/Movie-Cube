import Swal from "sweetalert2";

export default function Alert(displayIcon, response, responseText){
    Swal.fire({
        icon: displayIcon,
        title: response,
        text: responseText,
        background: 'black',
        backdrop: 'blur 200px'
    })
}