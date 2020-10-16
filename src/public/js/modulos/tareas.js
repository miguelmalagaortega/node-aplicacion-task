import Swal from "sweetalert2";
import axios from "axios";
import { actualizarAvance } from "../funciones/avance";

const tareas = document.querySelector(".listado-pendientes");

if (tareas) {
  tareas.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-check-circle")) {
      // Conseguir el id de la tarea
      const icono = e.target;
      const idTarea = icono.parentElement.parentElement.dataset.tarea;

      // request hacia /tareas/:id
      const url = `${location.origin}/tareas/${idTarea}`;
      // console.log(url);
      axios.patch(url, { idTarea }).then((respuesta) => {
        // cambio de actualizar
        if (respuesta.status === 200) {
          icono.classList.toggle("completo");
          actualizarAvance();
        }
      });
    }

    if (e.target.classList.contains("fa-trash")) {
      const tareaHTML = e.target.parentElement.parentElement;
      const idTarea = tareaHTML.dataset.tarea;

      // alertas
      Swal.fire({
        title: "¿Deseas borrar esta tarea?",
        text: "Una tarea eliminada no se puede recuperar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, borrar",
        cancelButtonText: "No, cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          const url = `${location.origin}/tareas/${idTarea}`;
          // Enviar el delete por medio de axios
          axios.delete(url, { params: { idTarea } }).then((respuesta) => {
            if (respuesta.status === 200) {
              // Eliminar nodo
              tareaHTML.parentElement.removeChild(tareaHTML);
              // Opcional, alerta
              Swal.fire("Tarea eliminada!", respuesta.data, "success");

              actualizarAvance();
            }
          });
        }
      });
    }
  });
}

export default tareas;
