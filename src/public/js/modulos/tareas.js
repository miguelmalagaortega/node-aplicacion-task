import axios from "axios";

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
        }
      });
    }
  });
}

export default tareas;
