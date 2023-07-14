const botonComprar = document.querySelectorAll('.boton-item');
botonComprar.forEach((botonComprarItem) => {
  botonComprarItem.addEventListener('click', clickAgregarAlCarrito);   /* para escuchar el evento click */
});

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', botonComprarClick);

const contenedorItemsCarrito = document.querySelector('.contenedorItemsCarrito');   /* almacena los items del carrito que tienen la clase .contenedorItemsCarrito  */

function clickAgregarAlCarrito(event) {  /* funcion que recibe un event, siempre que halla un eventlistener la funcion de callback enviara unevent */  
  const button = event.target;    /*captura el target del event */
  const item = button.closest('.item');     /* en item almacenamos todo lo que posee la clase item del html */

  const nombreItem = item.querySelector('.nombre-item').textContent;   /* guardamos el nombre del item*/
  const precioItem = item.querySelector('.precio-item').textContent;     /* guardamos el precio del item*/
  const imgItem = item.querySelector('.img-item').src;               /* guardamos la ruta de la imagen del item*/

  agregarItemCarrito(nombreItem, precioItem, imgItem);   /* funcion para agrear productos al carrito */
}


function agregarItemCarrito(nombreItem, precioItem, imgItem) {     /* funcion para agrear productos al carrito */
  const nombreElementos = contenedorItemsCarrito.getElementsByClassName('nombreItemCarrito');
  for (let i = 0; i < nombreElementos.length; i++) {
    if (nombreElementos[i].innerText === nombreItem) {  /* evalia si ya existe el articulo en el carrito */
      let cantidad = nombreElementos[i].parentElement.parentElement.parentElement.querySelector('.cantidadItemCarrito');
                    /* como se esta ubicado en h6 nombreItem, con parentElement nos subimos hasta el <div class="row itemCarrito"> */
      cantidad.value++;   /* suma uno cuando se elige el mismo articulo para comprar */
      actualizaTotalCarrito();     /* actualiza el total  $ de la compra  */
      return;   /* debe salir cuando se ha sumado el mismo articulo al carrito */
    }
  }

  const carritoRow = document.createElement('div');  /* se va a crear un div en el html para meter en el carrito*/
         /* a continuacion asignamos el div para crear los elementos en el carrito y mostrarlos   */
  const contenidoCarrito = `   
  <div class="row itemCarrito">
      <div class="nombre-imagen">
          <div class="item-car">
              <img src=${imgItem} class="imagen-carrito">
              <h6 class="nombreItemCarrito">${nombreItem}</h6>
          </div>
      </div>
      <div class="precio">
          <div>
              <p class="precio-item precioItemCarrito">${precioItem}</p>
          </div>
      </div>
      <div class="cantidad">
          <div>
              <input class="cantidadItemCarrito" type="number" value="1">
              <button class="botonBorrar" type="button">X</button>
          </div>
      </div>
  </div>`;

  carritoRow.innerHTML = contenidoCarrito;
  contenedorItemsCarrito.append(carritoRow);

  carritoRow                            /*  al carritoRow que es donde creamos cada fila del carrito boton borrar articulo o item le carrito   */
    .querySelector('.botonBorrar')
    .addEventListener('click', borraItemCarrito);    /*  boton borrar articulo o item le carrito */

    carritoRow                        /*  al carritoRow que es donde creamos cada fila del carrito boton borrar articulo o item le carrito   */
    .querySelector('.cantidadItemCarrito')      /*  cambiar la cantidad del mismo articulo en el carrito   */
    .addEventListener('change', cambiarCantidad);

  actualizaTotalCarrito();   /* funcion de actualizar total de la compra   */
}

function actualizaTotalCarrito() {   /* funcion para ir actualizando el total de la compra $    */
  let total = 0;     /* total  de la compra $ */
  const totalCarrito = document.querySelector('.totalCarrito');   /* querySelector de la clase .totalCarrito donde se almacena el total  */

  const itemsCarrito = document.querySelectorAll('.itemCarrito');  /* usamos querySelectorAll porque necesitamos todos los elementos de la clase .itemCarrito*/

  itemsCarrito.forEach((itemCarrito) => {         /* por cada item    */
    const elementoPrecioItemCarrito = itemCarrito.querySelector('.precioItemCarrito'); /*  */
    const precioItemCarrito = Number(elementoPrecioItemCarrito.textContent.replace('$', '')); /* quitar el simbolo de pesos y convetimos a number para sumar*/
    const elementoCantidadItemCarrito = itemCarrito.querySelector('.cantidadItemCarrito');   /* querySelector para sacar la cantidad  */
    const cantidadItemCarrito = Number(elementoCantidadItemCarrito.value);   /*  el dato que queremos es el valor   */
    total = total + precioItemCarrito * cantidadItemCarrito;       /* el total de la compra  */ 
  });
  totalCarrito.innerHTML = '$' + `${total.toFixed(2)}`;   /*  mostramos en el html el total, con toFixed es para mostrar solo 2 decimales   */
}

function borraItemCarrito(event) {    /* funcion para borrar un producto del carrito  */
  const clickBoton = event.target;       /* almacenamos de donde viene el evento */
  clickBoton.closest('.itemCarrito').remove();   /* borra el item o el articulo del carrito  */
  actualizaTotalCarrito();      /* actualiza el valor total de la compra, cuando se halla borado un producto del carrito   */ 
}

function cambiarCantidad(event) {    /* boton cantidad del carito  */
  const input = event.target;
  if (input.value <= 0) {     /*  para que cuando se quiera bajar la cantidad de articulos en el carrito no baje de ceros   */
    input.value = 1;          /*  lo maximo que baja la cantidad es hasta 1  */ 
  }
  
  /* input.value <= 0 ? (input.value = 1) : null;   */
  actualizaTotalCarrito();
}

function botonComprarClick() {     /* funcion para cuando se de el boton comprar deje el carrito vacio */
contenedorItemsCarrito.innerHTML = '';   /*  para que ponga vacio en el contenedor del carrito */
actualizaTotalCarrito();          /* actualiza el total de la compra a cero */
}
