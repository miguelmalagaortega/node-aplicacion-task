import Swal from "sweetalert2";
import axios from "axios";

const btnEliminar = document.querySelector("#eliminar-proyecto");

if (btnEliminar) {
  btnEliminar.addEventListener("click", (e) => {
    // url del proyecto
    const urlProyecto = e.target.dataset.proyectoUrl;
    // Nota: el atributo en el Html se llama data-proyecto-url pero para javascript ese nombre se debe colocar como proyectoUrl
    // console.log(urlProyecto);

    // alertas
    Swal.fire({
      title: "¿Deseas borrar este proyecto?",
      text: "Un proyecto eliminado no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // PETICIÓN A AXIOS
        // Recuperar la URL
        const url = `${location.origin}/proyectos/${urlProyecto}`;
        // console.log(url);

        // Eliminación desde el lado del cliente
        axios
          .delete(url, { params: { urlProyecto } })
          .then((respuesta) => {
            // console.log(respuesta);

            Swal.fire("Proyecto eliminado!", respuesta.data.message, "success");

            // redireccionar al inicio
            setTimeout(() => {
              window.location.href = "/";
            }, 3000);
          })
          .catch(() => {
            Swal.fire(
              "Hubo un error",
              "No se pudo eliminar el proyecto",
              "error"
            );
          });
      }
    });
  });
}

export default btnEliminar;
