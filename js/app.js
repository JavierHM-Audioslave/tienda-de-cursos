const botonAgregar = document.querySelectorAll(".card a");
const botonCruz = document.querySelector("#carrito");
const botonVaciarCarrito = document.querySelector("#carrito p");

/************************************************************************************/
// FEATURE: crear par clave/valor en LocalStorage que serán usados para guardar los cursos que el usuario haya agregado al carrito. //
if( localStorage.length === 0 || localStorage.getItem("cardsSeleccionadas") === null ) {


    let cursos = new Array();
    localStorage.setItem("cardsSeleccionadas", JSON.stringify(cursos));
}
/************************************************************************************/


/************************************************************************************/
// MAIN //
botonAgregar.forEach( function(e) { // A cada nodo contenido en la variable "botonAgregar"...
    e.addEventListener("click", agregarACarritoDesdeEventoClick);   // ... le defino un eventListener de Click para que ejecute la función "agregarACarritoDesdeEventoClick". //
});

botonCruz.addEventListener("click", eliminarCurso);
/************************************************************************************/


/************************************************************************************/
// FEATURE: se define e implementa evento para que, al terminar de cargarse la página, se agreguen automáticamente al carrito los cursos que el usuario tenia en éste antes de cerrar la página. //
let i = 0;
document.addEventListener("DOMContentLoaded", e => {
    const objetos = JSON.parse(localStorage.getItem("cardsSeleccionadas"));

    objetos.forEach( e => {
        const elementoTR = document.createElement("tr");
        const elementoTDConIMG = document.createElement("td");
        const elementoIMG = document.createElement("img");
        elementoIMG.src = e.imagen;
        elementoTDConIMG.appendChild(elementoIMG);
        elementoTR.appendChild(elementoTDConIMG);

        const elementoTDConTitulo = document.createElement("td");
        elementoTDConTitulo.innerHTML = e.titulo;
        elementoTR.appendChild(elementoTDConTitulo);


        const elementoTDConPrecio = document.createElement("td");
        elementoTDConPrecio.innerHTML = e.precio;
        elementoTR.appendChild(elementoTDConPrecio);

        const elementoTDConCruz = document.createElement("td");
        const elementoConCruz = document.createElement("a");
        elementoConCruz.innerHTML = e.cruz;
        elementoConCruz.href = "#";
        elementoTDConCruz.appendChild(elementoConCruz);
        elementoTR.appendChild(elementoTDConCruz);

        agregarACarritoDesdeEventoDOMContentLoaded(elementoTR);
    });

    if( objetos.length > 0 ) {  // Si en el LocalStorage hay al menos un curso agregado al carrito... 
        chequearAgregarBtnVaciarCarrito(); // ... ejecuto la función que chequea si corresponde agregar el botón "VACIAR CARRITO" al DOM. //
    }
});
/************************************************************************************/


/************************************************************************************/
// FEATURE: función que agrega al carrito los cursos que el usuario tenia en su carrito antes de cerrar la página. //
function agregarACarritoDesdeEventoDOMContentLoaded(elementoTR) {
    const elementoTBody = document.querySelector("tbody");  // Selecciono el elemento tbody que está dentro del carrito. //
    elementoTBody.appendChild(elementoTR);
}
/************************************************************************************/



/************************************************************************************/
// FEATURE: función que agrega al carrito los cursos a los que el usuario les hace click. //
function agregarACarritoDesdeEventoClick(e) {   // Función que se ejecuta cada vez que el usuario clickea en cualquiera de los botones "AGREGAR AL CARRITO" para que el curso seleccionado pueda ser ingresado en el carrito de la página. //
    e.preventDefault();

    let infoCard = {
        imagen: e.target.parentElement.children[0].attributes[0].nodeValue,
        titulo: null,
        precio: e.target.parentElement.children[5].children[0].textContent,
        cruz: "X"
    }

    if( e.target.parentElement.children[1].textContent === "HTML5, CSS3 y Javascript para Principiantes" ) {
        infoCard.titulo = "HTML5, CSS3 y Javascript";
    }
    else{
        infoCard.titulo = e.target.parentElement.children[1].textContent;
    }

    let cursos = JSON.parse(localStorage.getItem("cardsSeleccionadas"));
    for( let curso of cursos) {
        if( curso.titulo === infoCard.titulo ) {    // Esto es para evitar que el usuario ingrese cursos repetidos al carrito. //
            return;
        }
    }

    agregarInfoCardALS(infoCard);


    const elementoTR = document.createElement("tr");    // Creo elemento tr. //
    const primerTD = document.createElement("td");  // Creo los td. //
    const segundoTD = document.createElement("td");
    const tercerTD = document.createElement("td");
    const cuartoTD = document.createElement("td");

    elementoTR.appendChild(primerTD);   // Agrego los TR como hijos del TD. //
    elementoTR.appendChild(segundoTD);
    elementoTR.appendChild(tercerTD);
    elementoTR.appendChild(cuartoTD);

    const nuevaImagenEnCarrito = document.createElement("img"); // Creo elemento img. //
    nuevaImagenEnCarrito.src = infoCard.imagen; // Seteo el atributo "src" con la ruta de la imágen del curso que el usuario está agregando al carrito. //
    primerTD.appendChild(nuevaImagenEnCarrito); // Agrego el elemento con la imágen en el primerTD del carrito. //

    segundoTD.innerText = infoCard.titulo;    

    tercerTD.innerText = infoCard.precio;  

    const nuevaCruzEnCarrito = document.createElement("a"); 
    nuevaCruzEnCarrito.href = "#";
    nuevaCruzEnCarrito.innerText = infoCard.cruz;
    cuartoTD.appendChild(nuevaCruzEnCarrito);
    
    const elementoTBody = document.querySelector("tbody");  // Selecciono el elemento tbody que está dentro del carrito. //
    elementoTBody.appendChild(elementoTR);  // Adjunto el elemento "tr" al elemento "tbody" para que sea finalmente visualizado en el carrito. //

    chequearAgregarBtnVaciarCarrito();
}
/************************************************************************************/



/************************************************************************************/
// FEATURE: función que permite agregar al LocalStorage los cursos que el usuario está agregando al carrito. //
function agregarInfoCardALS( infoCard ) {
    let objetosInfoCard = JSON.parse(localStorage.getItem("cardsSeleccionadas"));
    objetosInfoCard.push(infoCard);
    localStorage.setItem("cardsSeleccionadas", JSON.stringify(objetosInfoCard));
}
/************************************************************************************/


/************************************************************************************/
// FEATURE: función que permite eliminar TODOS los cursos que estén agregados en el carrito. //
function eliminarTodosLosCursos() {
    const btnVaciarCarrito = document.querySelector("#carrito p");
    const elementoTBody = btnVaciarCarrito.previousElementSibling.children[1];
    const filasEnCarrito = Array.from(elementoTBody.children);
    filasEnCarrito.forEach( fila => fila.remove() );
    chequearEliminarBtnVaciarCarrito();
    let cursosEnLocalStorage = JSON.parse(localStorage.getItem("cardsSeleccionadas"));
    cursosEnLocalStorage = [];
    localStorage.setItem("cardsSeleccionadas", JSON.stringify(cursosEnLocalStorage));
}
/************************************************************************************/


/************************************************************************************/
// FEATURE: función que permite eliminar un curso agregado del carrito. //
function eliminarCurso(e) {
    e.preventDefault;
    if( e.target.tagName.toLowerCase() === "a") {
        const elementoTRParaEliminar = e.target.parentElement.parentElement;
        eliminarCursoDeLocalStorage(elementoTRParaEliminar);
        elementoTRParaEliminar.remove();
        chequearEliminarBtnVaciarCarrito(); // Luego de eliminar el curso del carrito en el DOM, chequeo si debo eliminar el botón "VACIAR CARRITO". //
    }
}
/************************************************************************************/



/************************************************************************************/
// FEATURE: función que permite eliminar del array del LocalStorage el/los elemento/s que el usuario eliminó del carrito. //
function eliminarCursoDeLocalStorage(elementoTR) {
    let objetoTemporal = {
        imagen: elementoTR.children[0].children[0].attributes[0].nodeValue,
        titulo: elementoTR.children[1].textContent,
        precio: elementoTR.children[2].textContent
    };
    let cursos = JSON.parse(localStorage.getItem("cardsSeleccionadas"));

    let i = 0;
    for( let curso of cursos ) {
        if( curso.imagen === objetoTemporal.imagen && curso.titulo === objetoTemporal.titulo && curso.precio === objetoTemporal.precio ) {
            cursos.splice(i, 1);
            break;
        }
        i++;
    }

    localStorage.setItem("cardsSeleccionadas", JSON.stringify(cursos));
 }
/************************************************************************************/



/************************************************************************************/
// FEATURE: función que permite evaluar si el botón de "VACIAR CARRITO" debe ser agregado al DOM. //
function chequearAgregarBtnVaciarCarrito() {
    const carrito = document.querySelector("#carrito");
        if( document.querySelector("#carrito p") === null ) {
        const btnVaciarCarrito = document.createElement("p");
        btnVaciarCarrito.textContent = "VACIAR CARRITO";
        carrito.appendChild(btnVaciarCarrito);
        btnVaciarCarrito.addEventListener("click", eliminarTodosLosCursos);
    }
}
/************************************************************************************/



/************************************************************************************/
// FEATURE: función que permite evaluar si el botón de "VACIAR CARRITO" debe ser eliminado del DOM. //
function chequearEliminarBtnVaciarCarrito() {
    const elementoTBody = document.querySelector("tbody");
    if( elementoTBody.childElementCount === 0 ) {
        const btnVaciarCarrito = document.querySelector("#carrito p");
        btnVaciarCarrito.remove();
    }
}
/************************************************************************************/