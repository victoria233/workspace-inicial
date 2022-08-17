function validateForm() {
    let validacion = document.getElementById("idemail").value && document.getElementById("idcontrasenia").value;
    if (validacion == 0) {
      alert("Por favor, complete ambos campos.");
    } else {
        location.href = "login.html"
    }
  }
/* el usuario no podra acceder a la pagina principal si no completa ambos campos, los cuales son de caracter obligatorio. Se le mostrará una alerta */