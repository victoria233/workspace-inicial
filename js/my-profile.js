const avatarPicSelected = document.getElementById("avatarPicSelected");
const avatarPic = document.getElementById("avatarPic");
const idemail = document.getElementById("idemail");




// para mostrar el email obtenido del localStorage.
const prueba3 = () => {

	idemail.value = localStorage.getItem("idemail");

};


// guardar la img en localstorage y usarla
let imgPerfil = localStorage.getItem("imgPerfil");

if (imgPerfil) {
    avatarPicSelected.src = imgPerfil;
}
// cargar-leer (load-filereader) la img cargada 
avatarPic.addEventListener("change", function () {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        const picDone = reader.result;
        localStorage.setItem("imgPerfil", picDone);
        avatarPicSelected.src = picDone;
    });
});

/* nav-localUser */

/* document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("nav-localUser").innerHTML = localStorage.getItem("localUser");
	prueba3();
}); */