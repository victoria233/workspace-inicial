function windowReplace(id){
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}

function showProductInfo(){
    /* para obtener el nombre del producto desde el json */
    document.getElementById("nombre-producto").innerHTML = `
        <h3 class="text-center">${product.name}</h3>
        `;
    /* para obtener e imprimir los detalles del producto */
    let htmlContentToAppend = "";
            htmlContentToAppend += `
                <div>
                    <div>
                        <hr
                        <p><strong>Precio</strong></p>
                        <p>${product.currency} ${product.cost}</p>

                        <p><strong>Descripción</strong></p>
                        <p>${product.description}</p>

                        <p><strong>Categoría</strong></p>
                        <p>${product.categoryName}</p>

                        <p><strong>Cantidad de vendidos</strong></p>
                        <p>${product.soldCount}</p>

                        <p><strong>Imágenes ilustrativas</strong></p>
                        <ul class="row p-0" id="imagen-producto"></ul>
                    </div> 
                </div>
                ` 
    document.getElementById("detalles-producto").innerHTML = htmlContentToAppend;
    imprimirImagenProducto();
}

function imprimirComentariosProducto(id,user,dateTime,score,description) {
    document.getElementById("extraerComentarios").innerHTML += `
    <li id="idComment_`+id+`" class="row comment-content">
        <div><h6><strong>`+user+`</strong> - `+dateTime+` - `+score+`</h6></div>
        <div>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
        </div>
        <p>`+description+`</p>
    </li>`;
}

function comentariosProducto(){
    for (let i = 0; i < productComments.length; i++) {
        let commentInfo = productComments[i];
        imprimirComentariosProducto(i,commentInfo.user,commentInfo.dateTime,commentInfo.score,commentInfo.description);
    }
}

/* funcion que muestra los productos relacionados (RelatedProduct) */
function showRelatedProducts() {

    let htmlContentToAppend = "";
    for (let i = 0; i < product.relatedProducts.length; i++) {
      let relatedProduct = product.relatedProducts[i];

      htmlContentToAppend += `
                <div class="col-4 cursor-active col-12 col-md-6 col-lg-4 p-4" onclick="windowReplace(${relatedProduct.id})">
                  <br>
                  <div>
                    <img src="${relatedProduct.image}" class="img-thumbnail">
                  </div>   
                    <h5>${relatedProduct.name}</h5>
                </div>
                  `;
  
      document.getElementById("mostrarProductosRelacionados").innerHTML = htmlContentToAppend;
    }
  }
document.addEventListener("DOMContentLoaded", function(e){
    let id = localStorage.productID; //guardar el id del producto
    if(id){
        getJSONData("https://japceibal.github.io/emercado-api/products/"+id+".json").then(function(resultObj){
        if (resultObj.status === "ok"){
            product = resultObj.data;
            showProductInfo();
        }
    });
    getJSONData("https://japceibal.github.io/emercado-api/products_comments/"+id+".json").then(function(resultObj){
        if (resultObj.status === "ok"){
            productComments = resultObj.data;
            comentariosProducto();
        } 
    });
        }
});

/* obtener productos relacionados (RelatedProduct) */
document.addEventListener("DOMContentLoaded", ()=> {
    let id = localStorage.productID;
    if(id){
      getJSONData("https://japceibal.github.io/emercado-api/products/"+id+".json").then(function(resultObj){
          if (resultObj.status==="ok") {
            product = resultObj.data;
            showRelatedProducts();
          }
        })    
    } 
  });

function imprimirImagenProducto(){
    let htmlContentToAppend = "";
    for(let i = 0; i < product.images.length; i++){
        let image = product.images[i];
                htmlContentToAppend += `
                <li class="col-2 d-flex">
                    <div>
                        <img src="${image}" class="img-thumbnail" id="img${i}">
                    </div>
                </li>
                `
        document.getElementById("imagen-producto").innerHTML = htmlContentToAppend;
    }
}



/* ** Sprint 3 - product-info (Part 1): Fix & apply part 3 & 4: **
fix convertir el entero del score to apply la puntuación in star format
apply functionality for add a new comment .js
fix -undefined- in categoryName detail, line 24*/