/* se adjunta el json en la siguiente constante, llamada CATAUTOS_URL*/
const CATAUTOS_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";

// se crea una variable vacia para guardar el json obtenido por el servidor
let currentCategoriesArray = [];

/* funcion que mostrará el contenido solicitado en el html traido del json, accediendo a el mismo */
function showCategoriesList(){


    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.products.length; i++){
        let product = currentCategoriesArray.products[i];

        /* contenido para mostrar en la pagina autos */
            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                            <small class="text-muted">${product.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${product.description}</p>
                    </div>
                </div>
            </div>
            `
          /*se crea la id autos101 para llamarla desde el html y mostrar el contenido */
        document.getElementById("autos101").innerHTML = htmlContentToAppend;
    }
}
// para mostrar el titiulo 'Productos' y su descripción  
        document.getElementById("titulo-productos").innerHTML = `
        <h2>Productos</h2>
        <p class="lead">Verás aquí todos los productos de la categoría <strong>Autos</strong></p> `;


/* Luego si el estado del json CATAUTOS_URL esta ok, la funcion guarda los datos en la lista creada al inicio y en el html muestra el contenido solicitado */
document.addEventListener("DOMContentLoaded", function(){
    getJSONData(CATAUTOS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCategoriesArray = resultObj.data
            showCategoriesList()
        }
    });
});