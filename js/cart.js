/* almacenar el id en una constante y concatenar con la demás info para guardar en una variable vacia*/
const USER_ID = 25801

let CARRITO1 = CART_INFO_URL + "25801" + ".json"
// se crea una variable vacia para guardar los datos obtenidos
USER_CART = {}

/* funcion que imprime los datos a medida que se van solicitando y en la ubicacion especificada || html structure */
function showCartUser25801() {
  let htmlContentToAppend = "";

          htmlContentToAppend += `
    <div class="d-flex justify-content-between align-items-center" >
    <div class="col">
          <h2 class="d-flex justify-content-center mb-4">Carrito de compras</h2>
          <h4 class="d-flex justify-content-start mb-4">Artículos a comprar</h4>
        </div>
    </div>
    <div class="row col-12 d-flex justify-content-between align-items-center" >

        <div class="col-2">Imágen</div>
        <div class="col-2">Nombre</div>
        <div class="col-2">Costo</div>
        <div class="col-2">Cantidad</div>
        <div class="col-2">Subtotal</div>
        <div class="col-2">Eliminar producto</div>

    </div>


                                   <hr class="mt-3">

      <div class="row d-flex justify-content-between align-items-center">
        <div class="col-2">
        <a onclick="verProductoInfo(${USER_CART.articles[0].id})"><img src="${USER_CART.articles[0].image}" class="img-thumbnail cursor-active"></a>
        </div>
        <div class="col-2">
          <div class="mb-0">${USER_CART.articles[0].name}</div>
        </div>
        <div class="col-2">
          <div class="mb-0">${USER_CART.articles[0].currency + USER_CART.articles[0].unitCost}</div>
        </div>



    <div class="col-2 d-flex">
        <button class="btn btn-outline-danger px-1" onclick="this.parentNode.querySelector('input[type=number]').stepDown(); costoTotal();">
            <i class="fas fa-1x">-</i>
        </button>

        <input id="costoTotal_id" min="1" name="quantity" value="1" size="3" type="number" class="form-control"/>

        <button class="btn btn-outline-success px-1" onclick="this.parentNode.querySelector('input[type=number]').stepUp(); costoTotal();">
            <i class="fas fa-1x">+</i>
        </button>
     </div>


      <div class="col-2" id="total_product">
          <div class="mb-0">${USER_CART.articles[0].currency + (USER_CART.articles[0].count * USER_CART.articles[0].unitCost)}</div>
      </div>

      <div class="col-2">
           <a onclick="eliminarProducto(${USER_CART.articles[0]})"><i class="btn btn-danger">x</i></a>
      </div>

        </div>
        `



document.getElementById("mostrarUser25801").innerHTML = htmlContentToAppend;
}

function verProductoInfo(id) {
  localStorage.setItem('productID', id);

  window.location.href = "product-info.html";
}

function costoTotal() {
  let quantity = document.getElementById("costoTotal_id").value;
  
  let htmlContentToAppend = `
          <div>${USER_CART.articles[0].currency + (quantity * USER_CART.articles[0].unitCost)}</div>
          `

  document.getElementById("total_product").innerHTML = htmlContentToAppend;
}

function eliminarProducto(USER_CART) {
  if (USER_CART.length > 1) {
    USER_CART.splice(USER_CART.articles[0], 1);
    showCartUser25801(USER_CART);
    } 
}

/* para obtener carrito del user 25801 */
document.addEventListener("DOMContentLoaded", function () {
  getJSONData(CARRITO1).then(function (result) {
    if (result.status === "ok") {
      USER_CART = result.data
      showCartUser25801(USER_CART)
    }
  })
})