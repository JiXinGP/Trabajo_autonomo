// Obtener el formulario y el contenedor de opiniones
const opinionForm = document.getElementById("opinionForm");
const opinionContainer = document.getElementById("opinionsContainer");

// Escuchar el evento de envío del formulario
if (opinionForm) {
  opinionForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const nameInput = document.getElementById("nameInput");
    const opinionInput = document.getElementById("opinionInput");

    const name = nameInput.value;
    const opinion = opinionInput.value;

    // Obtener los datos guardados previamente o inicializar un array vacío
    const storedOpinions = JSON.parse(localStorage.getItem("opinions")) || [];

    // Crear un objeto con los datos del formulario
    const opinionData = {
      name: name,
      opinion: opinion
    };

    // Agregar el objeto al array de opiniones
    storedOpinions.push(opinionData);

    // Guardar el array de opiniones en el almacenamiento local
    localStorage.setItem("opinions", JSON.stringify(storedOpinions));

    // Limpiar los campos del formulario
    nameInput.value = "";
    opinionInput.value = "";

    // Mostrar la nueva opinión en el mural de opiniones si opinionContainer existe
    if (opinionContainer) {
      const opinionElement = document.createElement("div");
      opinionElement.classList.add("opinion");

      const nameElement = document.createElement("p");
      nameElement.innerText = "Nombre: " + opinionData.name;
      nameElement.classList.add("titulo");

      const opinionTextElement = document.createElement("p");
      opinionTextElement.innerText = "Opinión: " + opinionData.opinion;
      opinionTextElement.classList.add("titulo");

      opinionElement.appendChild(nameElement);
      opinionElement.appendChild(opinionTextElement);

      opinionContainer.appendChild(opinionElement);

      // Animación para las opiniones recién agregadas
      opinionElement.style.opacity = 0;
      setTimeout(function() {
        opinionElement.style.opacity = 1;
      }, 100);
    }

    // Mostrar el mensaje emergente de éxito con Bootstrap
    const alertElement = document.createElement("div");
    alertElement.classList.add("alert", "alert-success", "mt-3");
    alertElement.setAttribute("role", "alert");
    alertElement.innerText = "Opinion enviada con exito";

    const formSection = document.querySelector("section");
    formSection.appendChild(alertElement);

    // Eliminar el mensaje emergente después de 3 segundos
    setTimeout(function() {
      alertElement.remove();
    }, 3000);
  });
}

// Cargar las opiniones almacenadas en el almacenamiento local al cargar la página
window.addEventListener("DOMContentLoaded", function() {
  // Obtener los datos guardados en el almacenamiento local
  const storedOpinions = JSON.parse(localStorage.getItem("opinions")) || [];

  // Recorrer los datos guardados y mostrarlos en el mural de opiniones si opinionContainer existe
  if (opinionContainer) {
    storedOpinions.forEach(function(opinionData) {
      const opinionElement = document.createElement("div");
      opinionElement.classList.add("opinion");

      const nameElement = document.createElement("p");
      nameElement.innerText = "Nombre: " + opinionData.name;
      nameElement.classList.add("titulo");

      const opinionTextElement = document.createElement("p");
      opinionTextElement.innerText = "Opinión: " + opinionData.opinion;
      opinionTextElement.classList.add("titulo");

      opinionElement.appendChild(nameElement);
      opinionElement.appendChild(opinionTextElement);

      opinionContainer.appendChild(opinionElement);

      // Animación para las opiniones
      opinionElement.style.opacity = 0;
      setTimeout(function() {
        opinionElement.style.opacity = 1;
      }, 100);
    });
  }
});
