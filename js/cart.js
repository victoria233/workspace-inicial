/* se adjunta el json en la siguiente constante */
const userCart25801_URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
// se crea una variable vacia para guardar el json obtenido por el servidor
let cartUser25801 = [];

/* funcion que imprime los datos a medida que se van solicitando y en la ubicacion especificada */
function showCartUser25801() {
    let htmlContentToAppend = "";

            htmlContentToAppend += `
                    <table class="table">
                     <thead>
                        <tr>
                        <th scope="col">Imagen</th>
                            <img src="${articles.image}" class="img-thumbnail" width=100>
                         <th scope="col">Nombre</th>
                             <p>${articles.name}</p>
                         <th scope="col">Costo</th>
                             <p>${articles.currency} ${articles.unitCost}</p>
                         <th scope="col">Cantidad</th>
                             <p>${articles.count}</p>
                         <th scope="col">Subtotal</th>
                            <p>${articles.unitCost * articles.count}</p>
                         <th scope="col">Eliminar producto</th>

                      </tr>
                    </thead>
                    </table>`
        document.getElementById("mostrarUser25801").innerHTML = htmlContentToAppend;
}


/* para obtener carrito del user 25801 */
  document.addEventListener("DOMContentLoaded", function(){
    getJSONData(userCart25801_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            cartUser25801 = resultObj.data
            showCartUser25801()
        }
    });
});