// se crea una variable vacia para guardar el json obtenido por el servidor
let currentProductsArray = [];
let categoryName = null;
/* se crea un let vacio para categoryName */

/* Esta es la funcionalidad para los 3 botones de los filtros */
/* funcionalidades de orden asc y desc en función del precio (Cost) y desc en función de la relevancia (la cantidad de artículos vendidos = soldCount) */
const ORDER_ASC_BY_COST = "0-9";
const ORDER_DESC_BY_COST = "9-0";
const ORDER_BY_PROD_SOLDCOUNT = "Rel.";
/* let currentCategoriesArray = []; */
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_SOLDCOUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

/* funcion que mostrará el contenido solicitado para el html traido del json, accediendo a el mismo */
function showProductsList(){


    let htmlContentToAppend = "";
    /* ciclo for para ir recorriendo el array, iniciando desde la posicion 1 (cero), y agrega 1 en 1 nuevos datos, no para modificar/reemplazar dato */
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

        /* para el filtro a partir de rango de precio definido (Cost) */
        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){

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
        }
          /*se crea la id contenido-categories para llamarla desde el html y mostrar el contenido solicitado (imprimir) */
        document.getElementById("contenido-categories").innerHTML = htmlContentToAppend;
    }

    /* let para mostrar el titiulo 'Productos', la descripción y el nombre correspondiente a cada categoria extraido del id "catName" correspondiente para imprimir cada ${CategoryName} */
    /* Importante: se lo define dentro de la funcion showCategoriesList() para que reconozca catName proveniente del json, de lo contrario mostrará undefined */
    document.getElementById("titulo-productos").innerHTML = `
        <h2>Productos</h2>
        <p class="lead">Verás aquí todos los productos de la categoría <strong>${categoryName}</strong></p>
        `;
}

function sortAndShowProducts(sortCriteria, ProductsArray){
    currentSortCriteria = sortCriteria;

    if(ProductsArray != undefined){
        currentProductsArray = ProductsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}

/* Luego si el estado del json esta todo bien (ok), la funcion guarda los datos en la lista creada al inicio para proceder a solicitar el contenido y mostrarlo en el html */
document.addEventListener("DOMContentLoaded", function(e){
    /* se crea el let llamado id que se fija el id de la categoria actual de localstorage que se esta solicitando acceder y se la solicita en el json (catID) en getjsondata
    con el identificador agregado dentro de la url para obtener cada ID. Then (luego) de esto la funcion siguiente se ejecutará mostrando lo demás */
    let id = localStorage.catID;
    getJSONData("https://japceibal.github.io/emercado-api/cats_products/"+id+".json").then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductsArray = resultObj.data;
            categoryName = currentProductsArray.catName;
            currentProductsArray = currentProductsArray.products;
            showProductsList()
        }
    });
    /* Para los filtros:
    Se extrae el siguiente fragmento desde categories.js - Y se cambia los nombres Categories por Products
    También se cambia según lo solicitado para el filtro proveniente de la key correspondiente en el json: 
    cost y soldcount según corresponda, y el nombre de dichas constantes es modificado por igual para identificarlas correctamente */
    /* Esta es la funcionalidad para los 3 botones de los filtros */
    /* funcionalidades de orden asc y desc en función del precio (Cost) y desc en función de la relevancia (la cantidad de artículos vendidos = soldCount) */
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });
    
    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });
    
    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_SOLDCOUNT);
    });
    
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
    
        minCount = undefined;
        maxCount = undefined;
    
        showProductsList();
    });
    /* para el filtro a partir de rango de precio definido */
    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });
});