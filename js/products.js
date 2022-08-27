// se crea una variable vacia para guardar el json obtenido por el servidor
let currentCategoriesArray = [];

/* funcion que mostrará el contenido solicitado para el html traido del json, accediendo a el mismo */
function showCategoriesList(){


    let htmlContentToAppend = "";
    /* ciclo for para ir recorriendo el array, iniciando desde la posicion 1 (cero), y agrega 1 en 1 nuevos datos, no para modificar/reemplazar dato */
    for(let i = 0; i < currentCategoriesArray.products.length; i++){
        let product = currentCategoriesArray.products[i];

        /* contenido para mostrar en la pagina con sus keys
        se extrae el siguiente fragmento desde categories.js para utilizarlo y se lo modifica segun se necesite aqui*/
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
          /*se crea la id contenido-categories para llamarla desde el html y mostrar el contenido solicitado (imprimir) */
        document.getElementById("contenido-categories").innerHTML = htmlContentToAppend;
    }

    /* let para mostrar el titiulo 'Productos', la descripción y el nombre correspondiente a cada categoria extraido del id "catName" correspondiente para imprimir cada {CategoryName} */
    /* Importante: se lo define dentro de la funcion showCategoriesList() para que reconozca catName proveniente del json, de lo contrario mostrará undefined */
    let categoryName = currentCategoriesArray.catName;
    document.getElementById("titulo-productos").innerHTML = `
        <h2>Productos</h2>
        <p class="lead">Verás aquí todos los productos de la categoría <strong>${categoryName}</strong></p>
        `;
}

/* Luego si el estado del json esta todo bien (ok), la funcion guarda los datos en la lista creada al inicio para proceder a solicitar el contenido y mostrarlo en el html */
document.addEventListener("DOMContentLoaded", function(){
    /* se crea el let llamado id para guardar en localstorage el id de cada categoria que se ira solicitando del json: catID en getjsondata
    con el identificador agregado dentro de la url para obtener cada id. Then (luego) de esto la funcion siguiente se ejecutará */
    let id = localStorage.catID;
    getJSONData("https://japceibal.github.io/emercado-api/cats_products/"+id+".json").then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCategoriesArray = resultObj.data
            showCategoriesList()
        }
    });
});