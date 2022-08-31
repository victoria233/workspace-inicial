/* Se crea la siguiente constante para almacenar el dato que el usuario ingrese en el cambio del email, identificado por la id 'idemail' */
const datoemail = document.getElementById('idemail');


function validateForm() {
    let validacion = document.getElementById("idemail").value && document.getElementById("idcontrasenia").value;
    if (validacion == 0) {
      alert("Por favor, complete ambos campos.");
      /* el usuario no podra acceder a la pagina principal si no completa ambos campos, los cuales son de caracter obligatorio. Se le mostrará una alerta */
    } else {
      /* del dato obtenido en la constante 'datoemail', agrega el valor obtenido a la key llamada 'myUser' */
      localStorage.setItem("myUser",datoemail.value);
      /* se redirecciona a la pagina de inicio de la tienda */
      location.href = "login.html"
    }
  }


document.addEventListener("DOMContentLoaded", function(){
  /* variable 'localUser' a la cual se le asignará el dato obtenido anteriormente en la id 'myUser' con setItem */
  let localUser = localStorage.getItem("myUser")
  /* luego va a imprimir el dato almacenado en 'localUser' en el html, donde se encuentre el id llamado 'nav-localUser' y lo muestra */
  document.getElementById('nav-localUser').innerHTML = localUser;
  })